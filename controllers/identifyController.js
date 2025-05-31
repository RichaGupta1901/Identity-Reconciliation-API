// Applying the logic for identifying a user based on email or phone number
const Contact = require('../models/Contact');
const { Op } = require('sequelize');

exports.identifyingUser = async (req, res) => {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) return res.status(400).json({ error: 'Email or Phone Number is required' });

  const existingContacts = await Contact.findAll({
    where: {
        [Op.or]: [
        ...(email ? [{ email }] : []),
        ...(phoneNumber ? [{ phoneNumber }] : [])
        ]
    },
    order: [['createdAt', 'ASC']]
  });

  let primaryContact = null;

  if (existingContacts.length > 0) {
    primaryContact = existingContacts.find(c => c.linkPrecedence === 'primary') || existingContacts[0];
    // Mark all others as secondary
    for (const contact of existingContacts) {
      if (contact.id !== primaryContact.id && contact.linkPrecedence !== 'secondary') {
        await contact.update({ linkedId: primaryContact.id, linkPrecedence: 'secondary' });
      }
    }

    // Check if input is a new identifier
    const exists = existingContacts.find(c => c.email === email && c.phoneNumber === phoneNumber);
    if (!exists) {
      await Contact.create({
        email,
        phoneNumber,
        linkPrecedence: 'secondary',
        linkedId: primaryContact.id
      });
    }
  } else {
    primaryContact = await Contact.create({ email, phoneNumber });
  }

  const allLinked = await Contact.findAll({
    where: {
      [Op.or]: [
        { id: primaryContact.id },
        { linkedId: primaryContact.id }
      ]
    }
  });

  const emails = [...new Set(allLinked.map(c => c.email).filter(Boolean))];
  const phoneNumbers = [...new Set(allLinked.map(c => c.phoneNumber).filter(Boolean))];
  const secondaryContactIds = allLinked.filter(c => c.linkPrecedence === 'secondary').map(c => c.id);

  res.json({
    contact: {
      primaryContactId: primaryContact.id,
      emails,
      phoneNumbers,
      secondaryContactIds
    }
  });
};


export const getChatbotResponse = (req, res) => {
  const { message } = req.body;

  if (!message || message.trim() === "") {
    return res.status(400).json({ 
      success: false,
      reply: "Please enter your travel question." 
    });
  }

 

  
  const botReply = generateTravelResponse(message);
  
  res.json({ 
    success: true,
    reply: botReply 
  });
};

function generateTravelResponse(userMessage) {
  const message = userMessage.toLowerCase().trim();
  

  if (message.includes('lahore')) {
    if (message.includes('best') || message.includes('place') || message.includes('visit')) {
      return `🏰 **Best Places in Lahore:**

**Historical Sites:**
• Badshahi Mosque - Stunning Mughal architecture
• Lahore Fort - Rich history and palace
• Shalimar Gardens - Beautiful Mughal gardens
• Minar-e-Pakistan - National monument

**Food & Culture:**
• Food Street - Traditional cuisine
• Anarkali Bazaar - Shopping and local culture
• Walled City - Ancient streets and heritage

**Best Time to Visit:** October to March
**Famous For:** Mughal heritage, delicious food, shopping`;
    }
    if (message.includes('food') || message.includes('eat')) {
      return "🍛 **Lahore's Famous Food:**\n• Nihari (spicy beef stew)\n• Paye (trotters soup)\n• Haleem (lentil and meat porridge)\n• Chaat (tangy street food)\n• Kebabs (grilled meat)\n• Biryani (flavorful rice dish)\n\nBest places: Food Street, Gawalmandi, Anarkali";
    }
    return "Lahore is amazing! Known for its rich Mughal heritage, delicious food, and vibrant culture. The Badshahi Mosque and Lahore Fort are must-visit historical sites!";
  }

 
  if (message.includes('islamabad') || message.includes('isb')) {
    if (message.includes('place') || message.includes('visit') || message.includes('see')) {
      return `🌄 **Top Places in Islamabad:**

**Landmarks:**
• Faisal Mosque - Largest mosque in South Asia
• Pakistan Monument - National symbol
• Daman-e-Koh - Scenic viewpoint
• Lok Virsa Museum - Cultural heritage

**Nature & Parks:**
• Margalla Hills - Hiking trails
• Shakarparian Park - Gardens and views
• Lake View Park - Family recreation

**Shopping:**
• Centaurus Mall - Modern shopping
• Jinnah Super Market - Local shopping

**Best For:** Family trips, hiking, cultural visits`;
    }
    return "Islamabad offers beautiful landscapes, modern infrastructure, and plenty of family-friendly activities. The Margalla Hills are perfect for hiking!";
  }

 
  if (message.includes('karachi') || message.includes('khi')) {
    if (message.includes('beach') || message.includes('sea')) {
      return "🏖️ **Karachi Beaches:**\n• Clifton Beach - Popular beach with activities\n• Sandspit Beach - Clean and peaceful\n• French Beach - Private and scenic\n• Paradise Point - Rock formations and views\n\nBeach activities: Camel rides, horse riding, beach volleyball";
    }
    if (message.includes('food') || message.includes('eat')) {
      return "🦀 **Karachi Food Specialties:**\n• Seafood at Do Darya\n• Biryani at Burns Road\n• Barbecue at Boat Basin\n• Street food at Saddar\n• Traditional Sindhi cuisine\n\nMust-try: Fried fish, prawn curry, crab dishes";
    }
    return "Karachi is vibrant with beautiful beaches, historical sites, and amazing food culture. Don't miss Clifton Beach and the local seafood!";
  }


  if (message.includes('northern') || message.includes('hunza') || message.includes('skardu') || message.includes('naran')) {
    return `🏔️ **Northern Pakistan Adventure:**

**Top Destinations:**
• Hunza Valley - Majestic mountains & hospitality
• Skardu - Gateway to K2 and beautiful lakes
• Naran & Kaghan - Stunning valleys and rivers
• Swat Valley - Switzerland of Pakistan
• Fairy Meadows - Nanga Parbat base camp

**Activities:**
• Trekking and hiking
• Camping under stars
• Photography tours
• Cultural experiences
• Mountain climbing

**Best Season:** May to September
**Travel Tips:** Carry warm clothes, book in advance`;
  }

 
  if (message.includes('murree') || message.includes('nathia') || message.includes('hill station')) {
    return `🌲 **Hill Stations - Summer Escapes:**

**Popular Hill Stations:**
• Murree - Most popular, Mall Road & viewpoints
• Nathia Gali - Pine forests and hiking trails
• Ayubia - Natural beauty and chairlift
• Thandiani - Serene and peaceful
• Patriata - Chairlift and adventure park

**Distance from Islamabad:** 1-3 hours
**Best Time:** April to June, September to November
**Perfect For:** Family vacations, honeymoon, relaxation`;
  }


  if (message.includes('budget') || message.includes('cheap') || message.includes('low cost')) {
    return `💰 **Budget Travel Tips:**

**Accommodation:**
• Stay in guesthouses or budget hotels
• Consider hostels in major cities
• Book in advance for better rates

**Transport:**
• Use local buses instead of taxis
• Travel offseason for lower fares
• Consider train travel for longer distances

**Food:**
• Eat at local restaurants
• Try street food for authentic experience
• Avoid tourist-only restaurants

**Activities:**
• Visit free attractions (parks, mosques)
• Explore local markets
• Enjoy natural scenery`;
  }

  if (message.includes('family') || message.includes('kids') || message.includes('children')) {
    return `👨‍👩‍👧‍👦 **Family-Friendly Destinations:**

**For Young Children:**
• Islamabad (parks, museums, safe environment)
• Lahore (zoos, historical sites with guides)
• Murree (hill station fun, easy access)

**For Teenagers:**
• Karachi (beaches, shopping malls)
• Northern areas (adventure, nature)
• Hill stations (hiking, photography)

**Family Activities:**
• Picnics in national parks
• Cultural museum visits
• Beach activities
• Cable car rides
• Local festival experiences`;
  }

  if (message.includes('best time') || message.includes('season') || message.includes('weather')) {
    return `📅 **Best Travel Seasons in Pakistan:**

**Northern Areas:** May to September ☀️
• Pleasant weather for trekking
• All routes accessible
• Green landscapes

**Plains (Lahore, Karachi):** October to March 🍂
• Cool and comfortable weather
• Perfect for sightseeing
• Festival season

**Hill Stations:** April to June, September to November 🏔️
• Summer escape from heat
• Beautiful spring and autumn
• Comfortable temperatures

**Coastal Areas:** November to February 🌊
• Pleasant beach weather
• Less humidity
• Perfect for outdoor activities`;
  }

 
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return `🌍 **Hello! I'm Your AI Travel Assistant** 👋

I can help you with:
• Destination recommendations
• Travel planning tips
• Local attractions info
• Best times to visit
• Budget suggestions
• Family travel advice

**Popular Questions:**
"Best places in Lahore?"
"Things to do in Islamabad?"
"Northern areas to visit?"
"Family vacation spots?"

Where would you like to explore today?`;
  }

  if (message.includes('thank') || message.includes('thanks')) {
    return "You're welcome! 😊 Happy to help with your travel planning. Safe journeys and amazing adventures! 🎒✨";
  }

  if (message.includes('help') || message.includes('what can you do')) {
    return `🎯 **How I Can Help You:**

**Destination Info:**
• Lahore - Historical & food capital
• Islamabad - Modern city & nature
• Karachi - Beaches & culture  
• Northern Areas - Adventure & scenery
• Hill Stations - Summer escapes

**Travel Planning:**
• Best times to visit
• Budget suggestions
• Family-friendly spots
• Local cuisine guides
• Transportation tips

Just ask me anything about travel in Pakistan!`;
  }

  const smartDefaults = [
    "I'd love to help you explore Pakistan! 🗺️ Could you tell me which city or region interests you most?",
    "That's a great travel question! I specialize in Pakistan destinations. Are you looking for historical sites, natural beauty, adventure, or cultural experiences?",
    "Pakistan has so much to offer! 🇵🇰 I can suggest amazing places based on your interests. What type of travel experience are you seeking?",
    "I'm here to help plan your perfect trip! Tell me about your travel preferences - are you interested in mountains, beaches, cities, or cultural heritage?",
    "Travel planning made easy! 🎒 I can recommend destinations for adventure, relaxation, family fun, or cultural exploration. What appeals to you?"
  ];

  return smartDefaults[Math.floor(Math.random() * smartDefaults.length)];
}
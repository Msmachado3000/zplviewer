# Digital Clock - Multi-Timezone Display

A beautiful, responsive digital clock application that displays the current time across multiple time zones simultaneously.

## Features

- ✨ **Real-time Updates**: Clock updates every second with accurate time
- 🌍 **Multiple Timezones**: Add and display clocks for any timezone
- 🎨 **Beautiful UI**: Modern gradient design with smooth animations
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- ⚡ **Easy to Use**: Simple dropdown to add/remove timezones
- 🌙 **Dark Mode Cards**: Alternating card themes for better readability
- 📅 **Date Display**: Shows current date in each timezone
- 🕐 **UTC Offset**: Displays UTC offset for each timezone

## Supported Timezones

- Americas: New York, Chicago, Denver, Los Angeles
- Europe: London, Paris, Berlin
- Asia: Tokyo, Shanghai, Hong Kong, Singapore, Dubai, India
- Australia: Sydney
- Pacific: Auckland
- UTC: Coordinated Universal Time

## How to Use

1. Open `index.html` in your web browser
2. The clock will display three default timezones: New York, London, and Tokyo
3. Select a timezone from the dropdown menu
4. Click "Add" to add a new timezone clock
5. Click the "×" button on any clock card to remove it
6. Click "Clear All" to remove all timezone clocks

## File Structure

```
.
├── index.html    # HTML structure
├── styles.css    # Styling and responsiveness
├── script.js     # JavaScript logic and functionality
└── README.md     # This file
```

## Technical Details

- Uses `Intl.DateTimeFormat` API for accurate timezone handling
- JavaScript updates clocks every 1000ms (1 second)
- CSS Grid layout for responsive card arrangement
- Gradient backgrounds for modern aesthetics
- Mobile-first responsive design

## Browser Compatibility

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Future Enhancements

- [ ] Save favorite timezones to localStorage
- [ ] Add 12-hour time format option
- [ ] Add analog clock display
- [ ] Add alarm functionality
- [ ] Add weather information per timezone
- [ ] Add timezone search functionality

## License

MIT License - Feel free to use and modify

const ICON = 'https://your-ngrok-url/icon.svg'; // Use a square SVG icon

window.TrelloPowerUp.initialize({
  'card-buttons': (t, options) => {
    return [{
      icon: ICON,
      text: 'Comment AI',
      callback: (t) => t.popup({
        title: 'Comment AI',
        url: './section.html',
        height: 600
      })
    }];
  },
  'card-back-section': function (t, options) {
    return {
      title: 'Comment AI',
      icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
      content: {
        type: 'iframe',
        url: t.signUrl('./section.html'),
        height: 400
      },
      action: {
        text: 'Settings',
        callback: (t) => t.popup({
          title: 'Comment AI Settings',
          url: './settings.html',
          height: 250
        })
      }
    };
  },
  'show-settings': (t, options) => {
    return t.popup({
      title: 'Comment AI Settings',
      url: './settings.html',
      height: 220
    });
  },
  'board-buttons': function (t, options) {
    return [{
      // Use a valid HTTPS URL for the icon. If local, use your ngrok URL
      icon: 'https://cdn-icons-png.flaticon.com/512/2103/2103633.png',
      text: 'Comment AI',
      callback: function (t) {
        return t.popup({
          title: 'Comment AI Settings',
          url: './settings.html',
          height: 250
        });
      }
    }];
  },
});
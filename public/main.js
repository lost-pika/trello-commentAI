const ICON = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM0MjUyNmUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCI+PC9jaXJjbGU+PC9zdmc+'; // Using your working icon

window.TrelloPowerUp.initialize({
  
  // 1. The Toggle Button
  'card-buttons': async (t, options) => {
    // Read the current visibility state (default is false)
    const isVisible = await t.get('card', 'shared', 'isCommentAIVisible', false);

    return [{
      icon: ICON,
      text: isVisible ? 'Remove Comment AI' : 'Add Comment AI',
      callback: async (t) => {
        // Toggle the state and save it to the card
        await t.set('card', 'shared', 'isCommentAIVisible', !isVisible);
      }
    }];
  },

  // 2. The AI Section
  'card-back-section': async function (t, options) {
    // Check if the section should be visible
    const isVisible = await t.get('card', 'shared', 'isCommentAIVisible', false);
    
    // If false, return null to hide the section
    if (!isVisible) {
      return null;
    }

    // If true, render the iframe
    return {
      title: 'Comment AI',
      icon: ICON,
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

  // (Unchanged)
  'show-settings': (t, options) => {
    return t.popup({
      title: 'Comment AI Settings',
      url: './settings.html',
      height: 220
    });
  },

  // (Unchanged)
  'board-buttons': function (t, options) {
    return [{
      icon: ICON,
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

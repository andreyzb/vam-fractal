const defaultStory = {
  title: 'Title Of Story',
  type: 'Content Type',
  img: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg',
  content: 'Lorem ipsum dolor sit amet, enatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
};

module.exports = {
  variants: [
    {
      name: 'default',
      label: 'Default',
      context: {
        stories: [
        {
          title: 'Title Of Story',
          type: 'Content Type',
          img: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg',
          content: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis,'
        },
        {
          title: 'Title Of Story',
          type: 'Content Type',
          img: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg',
          content: 'Lorem ipneanquis,'
        },
        {
          title: 'Title Of Story',
          type: 'Content Type',
          img: 'https://vanda-production-assets.s3.amazonaws.com/2017/05/24/10/34/05/7f38c9ec-ec6a-49d0-8c0e-0eb218cb9d27/1280.jpg',
          content: 'Lorem ipneanquis,'
        },
        ...(new Array(4).fill(defaultStory)),
        ]
      }
    },
    {
      name: 'more-than-four-boxes',
      label: 'More than four boxes',
      context: {
        stories: new Array(5).fill(defaultStory)
      }
    }
  ]
};

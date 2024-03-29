export const emptyDocument = {
  version: 1,
  type: 'doc',
  content: [],
};

export const layoutWithTwoColumns = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
      ],
    },
  ],
};

export const layoutWithThreeColumns = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
      ],
    },
  ],
};

export const layoutWithRightSideBar = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 66.66,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 33.33,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
      ],
    },
  ],
};

export const tableWithOneCallAndMedia = (id: string) => ({
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {},
              content: [
                {
                  type: 'mediaSingle',
                  attrs: {
                    layout: 'center',
                  },
                  content: [
                    {
                      type: 'media',
                      attrs: {
                        id,
                        type: 'file',
                        collection: 'MediaServicesSample',
                        width: 2378,
                        height: 628,
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});

export const oneImage = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: 2378,
            height: 628,
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

export const oneImagesNext = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
        width: 300,
        widthType: 'pixel',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: 500,
            height: 500,
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

export const legacyExternalImage = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
      },
      content: [
        {
          type: 'media',
          attrs: {
            type: 'external',
            alt: 'external media image',
            url: 'https://dummyimage.com/600x400/f4f5f7/a5adba',
          },
        },
      ],
    },
  ],
};

export const threeExternalImages = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
        widthType: 'pixel',
        width: 250,
      },
      content: [
        {
          type: 'media',
          attrs: {
            type: 'external',
            alt: 'new external media image',
            url: 'https://dummyimage.com/600x400/f4f5f7/a5adba',
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
        widthType: 'pixel',
        width: 250,
      },
      content: [
        {
          type: 'media',
          attrs: {
            type: 'external',
            alt: 'new large external media image',
            url: 'https://dummyimage.com/1280x800/f4f5f7/a5adba',
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
        widthType: 'pixel',
        width: 250,
      },
      content: [
        {
          type: 'media',
          attrs: {
            type: 'external',
            alt: 'new small external media image',
            url: 'https://dummyimage.com/500x300/f4f5f7/a5adba',
            width: 200,
            height: 150,
          },
        },
      ],
    },
  ],
};

export const threeImages = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: {
        width: 66.67,
        layout: 'wrap-left',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: 2378,
            height: 628,
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        width: 66.67,
        layout: 'wrap-right',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: 2378,
            height: 628,
          },
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        width: 41.666666666666664,
        layout: 'wrap-left',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: 2378,
            height: 628,
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

export const mediaGroupWithThreeMediaAndParagraphAtEnd = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello',
        },
      ],
    },
    {
      type: 'mediaGroup',
      content: [
        {
          type: 'media',
          attrs: {
            id: '6c160aba-2294-4a1e-a793-33b002267735',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
        {
          type: 'media',
          attrs: {
            id: '0fca5535-bfb3-4526-819b-1d9cf37f4b83',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
        {
          type: 'media',
          attrs: {
            id: '36b386d8-2be2-4049-a6aa-fdab0a14f552',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
  ],
};

export const mediaGroupWithThreeMedia = {
  type: 'doc',
  version: 1,
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Hello',
        },
      ],
    },
    {
      type: 'mediaGroup',
      content: [
        {
          type: 'media',
          attrs: {
            id: '6c160aba-2294-4a1e-a793-33b002267735',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
        {
          type: 'media',
          attrs: {
            id: '0fca5535-bfb3-4526-819b-1d9cf37f4b83',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
        {
          type: 'media',
          attrs: {
            id: '36b386d8-2be2-4049-a6aa-fdab0a14f552',
            type: 'file',
            collection: 'MediaServicesSample',
          },
        },
      ],
    },
  ],
};

export const wrappedMediaInsideTable = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'table',
      attrs: {
        isNumberColumnEnabled: false,
        layout: 'default',
      },
      content: [
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [382],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [122],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableHeader',
              attrs: {
                colwidth: [253],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colwidth: [382],
              },
              content: [
                {
                  type: 'mediaSingle',
                  attrs: {
                    width: 15,
                    layout: 'wrap-left',
                  },
                  content: [
                    {
                      type: 'media',
                      attrs: {
                        id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                        type: 'file',
                        collection: 'MediaServicesSample',
                        width: 840,
                        height: 980,
                      },
                    },
                  ],
                },
                {
                  type: 'mediaSingle',
                  attrs: {
                    layout: 'center',
                  },
                  content: [
                    {
                      type: 'media',
                      attrs: {
                        id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                        type: 'file',
                        collection: 'MediaServicesSample',
                        width: 1024,
                        height: 683,
                      },
                    },
                  ],
                },
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [122],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [253],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
          ],
        },
        {
          type: 'tableRow',
          content: [
            {
              type: 'tableCell',
              attrs: {
                colwidth: [382],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [122],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
            {
              type: 'tableCell',
              attrs: {
                colwidth: [253],
              },
              content: [
                {
                  type: 'paragraph',
                  content: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

export const mediaCardLazyLoad = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus vel est ex. Suspendisse porttitor volutpat orci at tincidunt. Vestibulum eu tristique ligula. Sed magna nulla, malesuada quis imperdiet a, vehicula et felis. Vivamus nec placerat magna. Aliquam nec lectus lorem. Fusce ut lectus in tellus commodo efficitur. Cras id quam quis lectus consequat ultrices. Curabitur dictum dui vitae lobortis sodales. Curabitur id bibendum mi, in tempus lorem. Nullam id dolor leo.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Vestibulum placerat nulla et dolor aliquet elementum. Maecenas pellentesque feugiat lacus, vitae mollis nibh volutpat et. In interdum, arcu a suscipit malesuada, nunc quam venenatis urna, nec eleifend mauris mauris nec nulla. In semper velit sed velit finibus pretium. Vivamus varius scelerisque risus, ac molestie leo porta at. In gravida venenatis libero ut mattis. Nullam in justo vel sem facilisis accumsan bibendum sed nunc. Vivamus pulvinar odio libero, nec cursus ante placerat id. In elit magna, varius at porttitor quis, maximus ac diam. Nullam in augue leo. Ut felis turpis, tempus nec nulla ut, tincidunt congue turpis. Curabitur accumsan consectetur ex, mattis pharetra arcu lobortis id. Proin imperdiet, sem at iaculis sagittis, sapien magna elementum ante, condimentum imperdiet turpis eros a velit. Proin accumsan ullamcorper imperdiet. Nullam eget tortor quam. Pellentesque hendrerit suscipit elementum.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Nam dictum dui ipsum, non aliquam magna accumsan in. Integer laoreet sit amet est at varius. Sed sed posuere orci, quis consectetur ipsum. Vestibulum velit enim, pulvinar quis interdum blandit, varius vitae tortor. Nulla euismod sit amet nunc at laoreet. In in nulla vel nisl auctor sagittis eget vel nibh. Proin ante sem, suscipit sed nisl eget, varius dapibus lorem. Phasellus facilisis ut leo non ornare. Fusce in tellus ut quam ornare dignissim. Duis volutpat dui vulputate nunc posuere, et efficitur leo tincidunt. Quisque vitae nisi sit amet lorem fringilla finibus eu sed felis. Nam et dolor dapibus, accumsan ligula fermentum, tempor sapien.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Praesent libero leo, ullamcorper at dui vel, lacinia rhoncus sapien. Interdum et malesuada fames ac ante ipsum primis in faucibus. Pellentesque eget mi luctus, fringilla massa sit amet, tincidunt dolor. Phasellus fermentum, sapien non dignissim gravida, est magna lacinia mi, vel pulvinar nulla lectus ut augue. Integer sagittis nisl a arcu lacinia, a fringilla turpis convallis. Fusce in tellus nisi. Nunc lacinia neque efficitur, bibendum orci in, consequat nisl. Sed aliquet malesuada orci. Pellentesque a orci ligula. Donec consequat magna efficitur sagittis tempor. Donec vitae auctor nunc. Ut mauris velit, sollicitudin sagittis laoreet et, cursus non neque. Mauris ornare sem in viverra egestas.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Mauris id diam tellus. Vivamus ut massa scelerisque, cursus purus at, semper enim. Donec eu feugiat neque. Maecenas at risus sed diam commodo egestas. Sed condimentum pharetra orci, id elementum nisl suscipit sit amet. Nulla non ipsum et quam convallis gravida a et dolor. Praesent gravida quis risus sit amet tempus. Etiam eu nibh ac ex faucibus gravida non quis lectus. Morbi vel aliquet justo, sed volutpat libero.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Aliquam commodo, quam vel iaculis vestibulum, nisi arcu sollicitudin enim, non auctor turpis velit et velit. Suspendisse potenti. Aenean consectetur aliquet nunc sed pulvinar. Sed ut dui nec ex sollicitudin ultricies quis nec neque. Fusce dictum fermentum commodo. Maecenas lobortis lobortis tellus nec rhoncus. Etiam tincidunt justo nec lacus elementum, eu facilisis nibh consectetur. Mauris eget finibus nibh. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nulla congue velit nec magna ullamcorper, ac hendrerit eros maximus. Fusce et quam ut lectus gravida vestibulum ut ac ante. Nulla rhoncus lacinia sem at tempus. Morbi ac aliquam ligula. Nulla dictum risus euismod posuere efficitur. Suspendisse potenti.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Pellentesque porta lacinia turpis ut finibus. Ut viverra sem eu urna porta feugiat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Ut ut elit eget tortor semper ornare. In hac habitasse platea dictumst. Mauris dictum lacinia varius. Donec blandit condimentum neque sed blandit. Nam sed accumsan ante. Curabitur auctor, eros et tincidunt pharetra, ligula risus semper risus, id posuere lorem erat vitae diam. Cras tellus ipsum, placerat quis rhoncus quis, tempus in sem. Ut gravida tempus ipsum. Sed luctus hendrerit vestibulum. Donec eleifend dignissim lacinia. Pellentesque quam sem, consequat eget lectus posuere, ornare aliquet ante. Maecenas quis dui quis diam elementum aliquet vel eget metus.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Fusce quis est orci. Fusce nec mollis mi. Proin tincidunt nunc mi, vel condimentum ligula fringilla vel. Nunc nec lectus quis libero fringilla tincidunt eget at odio. Sed cursus, nisi nec vulputate dignissim, enim mauris pellentesque erat, cursus dapibus dolor libero ut nisl. Sed viverra, turpis non suscipit semper, massa libero sagittis lectus, a dapibus nisl nisi in turpis. Quisque auctor enim diam, ac facilisis risus vestibulum in.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Vivamus condimentum augue vitae enim molestie, at convallis lectus fermentum. Duis feugiat dapibus nunc vitae consectetur. Sed nec mauris tellus. Suspendisse eget tempor massa. Praesent imperdiet venenatis ex quis sollicitudin. Integer id finibus dui, vel placerat lectus. Cras faucibus, dui in rutrum egestas, erat urna pulvinar massa, quis rhoncus diam arcu et arcu. Nunc porta justo augue, non aliquet quam vestibulum eu. Integer pellentesque lectus ac odio vulputate, tincidunt accumsan massa bibendum.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Praesent iaculis justo neque, et tempus neque dictum eu. Nunc sit amet auctor quam, commodo malesuada felis. Pellentesque magna enim, facilisis nec turpis quis, ultrices pellentesque libero. Aliquam posuere turpis eros, id gravida augue aliquet pulvinar. Donec ut ligula erat. Sed egestas metus sit amet sapien dignissim, molestie aliquam urna mollis. Morbi cursus lorem eget fermentum rhoncus. Fusce pretium erat sapien, ac convallis lacus gravida sit amet. Donec porttitor ligula purus, varius venenatis neque laoreet non.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Vivamus vel tincidunt elit. Integer turpis neque, porta at imperdiet ac, sagittis id orci. Quisque tristique congue hendrerit. Maecenas maximus ex non volutpat aliquam. In non libero aliquam, fermentum neque nec, maximus nibh. Nullam dictum, dolor ac feugiat interdum, nibh ante mollis arcu, vitae suscipit sem erat eget urna. Maecenas venenatis diam id enim suscipit rhoncus. Donec lacus velit, semper ac mauris eget, ultricies mattis ipsum. Vivamus in turpis tortor. Morbi luctus orci sit amet aliquam facilisis. Donec porttitor ante ac lorem cursus volutpat. Integer mollis in urna quis lacinia. Sed non fermentum neque, vitae placerat nibh.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Quisque tincidunt mollis varius. Cras vel tortor id libero varius dapibus et at massa. Aenean suscipit mi purus, at cursus nulla congue vitae. Vestibulum suscipit mauris ex, sed gravida mi egestas non. Integer sed vehicula erat. Aliquam erat volutpat. Praesent mi justo, cursus eu nulla id, ultricies blandit libero. Suspendisse fringilla mi ut bibendum lobortis. Nam condimentum et odio vitae aliquam. Curabitur hendrerit tellus turpis, eget luctus justo molestie maximus. Cras id mauris lectus. In dignissim lorem ut aliquam aliquam. Suspendisse porttitor at purus dignissim porta. Vivamus sed nisi eget ligula dignissim varius dignissim quis augue.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Aenean ornare accumsan felis feugiat venenatis. In lobortis sollicitudin nisl quis maximus. Duis quis cursus arcu. Vivamus fermentum nulla id nibh faucibus, sed dictum massa dapibus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Ut eleifend vestibulum finibus. Pellentesque justo ex, varius non risus maximus, auctor imperdiet leo. Ut mattis et erat id pulvinar. Morbi tortor felis, cursus vel mi quis, tempor suscipit mi. Donec faucibus efficitur ex. Donec blandit lacus quis vestibulum dignissim. Ut ac fermentum nunc, eu molestie eros.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Donec vel nulla id elit lacinia pellentesque. In ultricies enim non arcu mattis molestie. Maecenas orci arcu, rhoncus ac mollis vitae, malesuada quis mauris. Quisque facilisis porttitor tempor. Nam efficitur ullamcorper euismod. Aliquam erat magna, porta nec auctor a, egestas efficitur quam. Cras porta blandit porttitor. Integer convallis, ante in volutpat iaculis, odio metus dapibus ex, at aliquam ipsum diam sit amet diam. Ut luctus nibh et nunc ultricies lacinia.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Sed laoreet fermentum erat vel accumsan. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Morbi faucibus, est non condimentum tempor, dui nisl varius quam, a rutrum ex lectus nec lorem. Vivamus non ligula eget urna hendrerit mollis. Vivamus molestie nulla diam, non malesuada felis aliquet ut. Proin gravida tellus molestie magna tempor, in vestibulum nulla commodo. Vivamus ac bibendum dolor. Fusce nec mi ultrices, egestas turpis sed, rutrum purus. Sed sed diam euismod, consequat sem ac, lacinia orci. Donec a lobortis metus. Praesent blandit elit sit amet dolor iaculis, et tempor felis laoreet. Nulla scelerisque libero malesuada, mattis enim sed, aliquam massa. Integer facilisis tempus aliquet. Integer sit amet tellus sed velit pretium tristique. Aliquam quam erat, pellentesque at justo ut, consequat mattis dolor.',
        },
      ],
    },
    {
      type: 'mediaSingle',
      attrs: {
        layout: 'center',
      },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
            type: 'file',
            collection: 'MediaServicesSample',
            width: 2378,
            height: 628,
          },
        },
      ],
    },
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Nullam lobortis sodales erat. Aliquam erat volutpat. Sed viverra vestibulum sodales. Sed at odio aliquam, vestibulum nunc vitae, faucibus nisl. Morbi elementum velit a dui placerat commodo. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed augue augue, tempor id velit a, dapibus efficitur leo. Praesent id dictum velit. Duis nec velit viverra, maximus sem a, dictum velit.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Nam vel ornare ex. Aliquam accumsan, velit ut fermentum interdum, dolor augue rutrum sem, vel accumsan ante tellus a lacus. Sed pulvinar arcu nec pulvinar ultricies. Donec a magna id arcu tincidunt tempus non sed nisi. Morbi sagittis vehicula leo, non aliquet massa faucibus nec. Sed bibendum ligula a facilisis aliquet. Nullam dictum non sem non tempor. Donec at congue lorem.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Sed ornare blandit arcu quis volutpat. Etiam lobortis elit a nunc congue molestie eu et velit. Sed dolor est, tempor efficitur lorem non, laoreet ullamcorper felis. Aliquam fermentum elementum orci. Fusce vestibulum euismod feugiat. Pellentesque lobortis mollis ipsum eget ultrices. Curabitur nec ex metus. Aliquam erat volutpat. Duis cursus, erat nec vestibulum pulvinar, lectus dolor bibendum purus, id finibus augue quam eu ante. Sed pellentesque tortor vel ante consectetur, ut suscipit dolor aliquet. Curabitur id ante purus. Morbi fringilla quis enim vel iaculis. Mauris at lorem eu ligula tempus mattis et vitae erat.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Curabitur et odio id dolor elementum ornare. Donec eleifend risus velit, sed mollis quam porta eu. Donec pulvinar neque ut velit mollis accumsan. Quisque aliquam iaculis aliquam. Donec sodales nibh sem. Morbi at maximus purus. Nunc enim magna, vestibulum placerat fringilla sed, luctus id lacus. Donec nisl magna, tempus et eros in, ullamcorper luctus lorem. Praesent tincidunt a neque nec convallis. Sed orci elit, condimentum venenatis finibus eget, eleifend quis metus. Proin maximus, risus at fermentum euismod, libero lacus porta tellus, id scelerisque ligula felis id orci. Vestibulum gravida dolor in lectus hendrerit sollicitudin. Mauris nec nunc tempus, facilisis dolor id, posuere purus.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'text',
          text: 'Pellentesque ornare, ante commodo euismod porta, velit purus aliquam lorem, vitae cursus leo nunc vel magna. Suspendisse lacus mauris, egestas sit amet lacus convallis, rhoncus malesuada justo. Pellentesque quis consequat neque. Fusce quis viverra erat. Mauris aliquam, leo ac gravida semper, leo velit ornare massa, viverra tempus diam ipsum non risus. Praesent lobortis ipsum nec ante gravida, in malesuada nisi tincidunt. Ut nec tempor leo. Fusce ullamcorper sem nisi, sit amet consectetur quam lobortis at. Donec non nunc sem. Morbi at orci nisi.',
        },
      ],
    },
    {
      type: 'paragraph',
      content: [
        {
          type: 'hardBreak',
        },
      ],
    },
  ],
};

export const adfWithOneExternalMedia = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'mediaSingle',
      attrs: { layout: 'center' },
      content: [
        {
          type: 'media',
          attrs: {
            id: 'd2c06372-8edb-4371-8cb9-007fb60cfa94',
            type: 'file',
            collection: 'MediaServicesSample',
            occurrenceKey: 'a2babdf8-27d9-4a6a-897a-7c6d22671c95',
            width: 860,
            height: 359,
            __fileName: 'test-image-9kb.jpg',
            __fileSize: 8751,
            __fileMimeType: 'image/jpeg',
            __displayType: null,
            __contextId: 'DUMMY-OBJECT-ID',
            __mediaTraceId: null,
            __external: true,
          },
        },
      ],
    },
  ],
};

export const getMediaListAdf = (type: 'bulletList' | 'orderedList') => {
  return {
    version: 1,
    type: 'doc',
    content: [
      {
        type: 'mediaSingle',
        attrs: {
          layout: 'center',
        },
        content: [
          {
            type: 'media',
            attrs: {
              id: 'a559980d-cd47-43e2-8377-27359fcb905f',
              type: 'file',
              collection: 'MediaServicesSample',
            },
          },
        ],
      },
      {
        type: 'paragraph',
        content: [],
      },
      {
        type: type,
        content: [
          {
            type: 'listItem',
            content: [
              {
                type: 'paragraph',
                content: [],
              },
            ],
          },
        ],
      },
    ],
  };
};

export const mediaSingleInsideListWithinLayoutAdf = {
  version: 1,
  type: 'doc',
  content: [
    {
      type: 'paragraph',
      content: [],
    },
    {
      type: 'layoutSection',
      content: [
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
        {
          type: 'layoutColumn',
          attrs: {
            width: 50,
          },
          content: [
            {
              type: 'bulletList',
              content: [
                {
                  type: 'listItem',
                  content: [
                    {
                      type: 'mediaSingle',
                      attrs: {
                        width: 50,
                        layout: 'center',
                      },
                      content: [
                        {
                          type: 'media',
                          attrs: {
                            id: 'a559980d-cd47-43e2-8377-27359fcb905f',
                            type: 'file',
                            collection: 'MediaServicesSample',
                            width: 500,
                            height: 500,
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'paragraph',
              content: [],
            },
          ],
        },
      ],
    },
  ],
};

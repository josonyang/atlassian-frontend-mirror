import { JsonLd } from 'json-ld-types';
import avatar1 from '../images/avatar-1.svg';
import avatar2 from '../images/avatar-2.svg';
import avatar3 from '../images/avatar-3.svg';
import preview from '../images/rectangle.svg';

const today = new Date();
const yesterday = new Date().setDate(today.getDate() - 1);
const lastMonth = new Date().setDate(today.getMonth() - 1);
export const url = 'https://product-fabric.atlassian.net/wiki/spaces/EM';

export const response1 = {
  meta: {
    visibility: 'public',
    access: 'granted',
    auth: [],
    definitionId: 'd1',
    key: 'object-provider',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    '@type': ['Object', 'schema:BlogPosting'],
    'atlassian:priority': 'Major',
    'atlassian:reactCount': 78,
    'atlassian:state': 'draft',
    'atlassian:subscriberCount': 45,
    'atlassian:updatedBy': { '@type': 'Person', icon: avatar2, name: 'Steve' },
    attributedTo: [
      { '@type': 'Person', icon: avatar1, name: 'Angie' },
      { '@type': 'Person', icon: avatar2, name: 'Steve' },
      { '@type': 'Person', icon: avatar3, name: 'Aliza' },
    ],
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Confluence',
      name: 'Confluence',
    },
    endTime: '2018-07-31T00:00:00.000Z',
    image: preview,
    mediaType: 'text/plain',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'schema:commentCount': 22,
    'schema:dateCreated': new Date(lastMonth).toISOString(),
    summary:
      'Nunc justo lectus, blandit ut ultrices a, elementum quis quam. In ut dolor ac nulla gravida scelerisque vitae sit amet ipsum. Pellentesque vitae luctus lorem. Etiam enim ligula, lobortis vel convallis ut, elementum ut nibh. Mauris ultricies mi risus, vel condimentum lorem convallis eu. Cras pharetra, dui nec gravida rutrum, mauris odio commodo mauris, eu lacinia dui mi nec tortor. Curabitur eleifend tortor eros, id venenatis est posuere sit amet. ',
    updated: new Date(yesterday).toISOString(),
    url,
  },
};

export const response2 = {
  meta: {
    auth: [],
    definitionId: 'jira-object-provider',
    visibility: 'restricted',
    access: 'granted',
    resourceType: 'issue',
    key: 'jira-object-provider',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Jira',
      name: 'Jira',
    },
    '@type': ['atlassian:Task', 'Object'],
    name: 'Maecenas sagittis mauris ut lacinia molestie.',
    'schema:dateCreated': '2021-10-19T11:35:10.027+1100',
    updated: '2022-02-22T10:25:11.676+1100',
    'schema:commentCount': 1,
    'atlassian:priority': 'Major',
    'atlassian:subscriberCount': 2,
    tag: { '@type': 'Object', name: 'Done', appearance: 'success' },
    taskType: {
      '@type': ['Object', 'atlassian:TaskType'],
      '@id': 'https://www.atlassian.com/#JiraEpic',
      name: 'Epic',
    },
    attributedTo: {
      '@type': 'Person',
      name: 'Aliza',
      icon: { '@type': 'Aliza', url: avatar3 },
    },
    url,
    summary: 'Donec dui quam, malesuada ut magna a, faucibus sodales quam.',
  },
} as JsonLd.Response;

export const response3 = {
  meta: {
    auth: [],
    definitionId: 'confluence-object-provider',
    visibility: 'restricted',
    access: 'granted',
    resourceType: 'page',
    key: 'confluence-object-provider',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Confluence',
      name: 'Confluence',
    },
    '@type': ['Document', 'schema:TextDigitalDocument'],
    url,
    name: 'Nulla convallis enim ac lectus vehicula suscipit.',
    'atlassian:state': 'current',
    summary:
      'Aenean nec urna et ex commodo mattis. Pellentesque feugiat fermentum venenatis. Curabitur eleifend, ipsum sit amet tincidunt tempor, quam elit interdum lorem, non porta erat nibh eu enim.',
    'schema:commentCount': 55,
    'schema:dateCreated': new Date(yesterday).toISOString(),
    'atlassian:subscriberCount': 5,
    preview: { '@type': 'Link', href: preview },
    attributedTo: [
      { '@type': 'Person', icon: avatar3, name: 'Aliza' },
      { '@type': 'Person', icon: avatar1, name: 'Angie' },
    ],
  },
};

export const response4 = {
  meta: {
    auth: [],
    definitionId: 'watermelon-object-provider',
    visibility: 'restricted',
    access: 'granted',
    key: 'watermelon-object-provider',
  },
  data: {
    '@context': {
      '@vocab': 'https://www.w3.org/ns/activitystreams#',
      atlassian: 'https://schema.atlassian.com/ns/vocabulary#',
      schema: 'http://schema.org/',
    },
    generator: {
      '@type': 'Application',
      '@id': 'https://www.atlassian.com/#Jira',
      name: 'Atlas',
    },
    '@type': ['Object', 'atlassian:Task'],
    url,
    name: 'Aliquam aliquet tellus a aliquet rutrum.',
    summary:
      'Sed et euismod leo. Phasellus accumsan orci mauris, ac dignissim nunc euismod et. Donec consequat dui nec est pellentesque egestas.',
    taskType: {
      '@type': ['Object', 'atlassian:TaskType'],
      '@id': 'https://www.atlassian.com/#JiraCustomTaskType',
      icon: {
        '@type': 'Image',
        url:
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFTElEQVR4XuWb7U9bVRzHeWHQRN8tJr6a08SZGLcXauJTN4gwaTdqgdqWRVB8WMw2TZwsGzMkU+MLGQPnWLEkjj4BQisDt5axZtDSPdRRt7iOPqG+8h9YNt7/vOfCrb3nd0vvvX26bU/ySQj3nl/P93vPOfd3bs6pqRFZDFFX7f5V5x5T0mk2rTr9DKvM3w8ZoMQ8ZNtC2sS0jbSRtJVuv+xiiFqfIoEZHgj8uFIhbTWTttN6RBfNX2cfNSUd3zCB1gR+oFxYIxqIFlrfpmXjqYcEApYrIdG9wRAf22FMOv8VCFLWEE1EG62XV4hLlSiegzUhU09YH/MV1e0zERKcE4yrzm8Fbq5IiFae+I1Jr5xne6ms8YYCk0QMC9xU2TCaN56+q5b5x310QxljiEyALjAN+ju/oGtp3GczRmPc0SRwsewwxsZg3/ws1P+0AG9+f41l95kAuo9Xh9FeY1pPc9HFcsGwMg6aGQ/sGlhKCRdrAIOZjH+/wAXlk3BCM/PEiUhaOEfj+Dyulw6jnfSABLqgcFpuuKDevIgE02ivXkB1KRLEgLJZ5RlWxkDt9oKqL4jE0pCeYYyPoRgUD4gB9D8ViW7pV9j9ox8JzYTm4kUUQwjFG0Bm9yb3HBK4GbsGmafPTI50LCEUbYD+9iTvtSaWfXO/oViZUKwBZAJT9Wcf6zR1Q4tixn4K5RnAvN7U0x4kTCzv+KdxzE1QlAHG6Dg02q4gUWJpdF5BMbOhGAP0dyZFvdszQTLBd+9OoLjZUIQB+vCkpFecEFrfDIorhpIb0BpyCebxUmiw+VBcsZTUgJYbblCdzk08yfjkdH2OkhnQctMt6zWXDkmJddfdKLYUSmIAGfO5dnsCWQbTsaVSdANId63LccIjvDXqY3MGOr5UimoAyevlpLY0dUN+9kMIHV8ORTXgbZcXiZEKmTTbwlMotlyKZgBJUWkxkum7xiyLpaW62SiKAfo/J/Iy6TX7ZlHsXCmKAQ12+fk9x95L4pe4UiioAZ8nLkDPzUVQCQiSQj5ed5komAEfJafgeiwJf8T+gUFvRLYJTW4vip1PCmbARHyZFc9xdu6eZBP2esR918uFghhwIuHhiecQ2xNUp4KgXZC3upNKQQwYTPiReLEmkMUNWSTRMQtFQQw4EjwPgXAEic9mQoPVl9PKTg55M6DznhW+mzoJM72dsHRQB8Gj78Ny6BYSz8GbE5gERzN7CYwJ8R8z80VeDDh++RRc7jaxwtPJZsKAJwL1lgVou5W/1FYqORtwbL4fAof4wqWYcCDhQjGLSU4GfBIeAd8XBiSaRsiEcOxvGI4HoV0gbjHJyQBbqxrc23dC4IAWiaYhJly9HWXF+2IrcCSZ/7xeDrIN6BnpAdsjW1l8hj1IMA3pKR9EHWx6vF8gXqmQbYDtpVdTBix0aJBgmnMj3SiGEpBlwEFvP9hqn/6/B7Q2IMHp+A+3wKchM4qjBIgBkjdIDHW2pcQTHI8/A+7ndrLzwVxTHTJgwHYCxVAI7AYJyVtkHFtf5BmQzviW7Tzx5384DO15+HhZIBKSN0kdt/Yi0TwDnnw+Jd5s+RLa4w4UQzFsbJISvU3uvYgNHNt2INE07jdeg69tvai+AjGL3ijZcXcUrK+8jsSmY3/iWRjWquHD5RFUX4mwGyXFbJU9aj+ZcdzbH9sG9hdehtOfdUDXsgXVVTDrW2WzbZbu+t0CZz42gqVZneKcSQd93V1w7OevmGExiuqUBdxm6fUN01W+XZ6Uqj4wQUrVH5khpaoPTXGlqo/NcaWqD05ypaqPzqaXqj08TZdKPT7/H9NbXYpTJ+ztAAAAAElFTkSuQmCC',
      },
      name: 'Aliquam aliquet tellus a aliquet rutrum.',
    },
    tag: { type: '@Object', name: 'Completed', appearance: 'success' },
    preview: { '@type': 'Link', href: preview },
    attributedTo: [
      { '@type': 'Person', icon: avatar2, name: 'Steve' },
      { '@type': 'Person', name: 'Tony Stank' },
      { '@type': 'Person', name: 'Agatha Harkness' },
    ],
    'schema:dateCreated': '2022-03-11T11:35:10.027+1100',
  },
};

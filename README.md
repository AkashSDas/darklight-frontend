# darklight-frontend

DarkLight is a web application where you can enroll in courses and learn from them. If you are aspired to be a teacher, you can create your own courses and teach them to the world.

This is the web frontend for DarkLight. It is built using React, NextJS, Redux, and TailwindCSS.

![](docs/cover.jpg)

## Getting Started

First, get it in your system:

```bash
git clone https://github.com/AkashSDas/camps-for-champs-frontend.git
cd camps-for-champs-frontend
npm install
```

Then polulate the .env file with the following variables. You can find the example of the .env file in the .env.example file.

## Environment Variables

Backend URL (update this if you are using a different backend URL)

```.env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5002/api/v2
```

You would need [Stripe](https://stripe.com/en-in) account to get a `publishable key`.

```.env
NEXT_PUBLIC_STRIPE_PUBLIC=pk_test_...
```

## Tech Stack

- ReactJS & NextJS
- Tailwind CSS
- Redux
- SWR & Axios
- Framer Motion
- Stripe
- React Beautiful DND
- Formik & Yup
- Debounce
- Jest, Jest DOM & Testing Library

## Testing

Currently testing has only been setup and no tests have been written. To run the tests, run the following command:

```bash
npm run test
```

### Important tests

- [ ] Authentication
- [ ] Course enrollment
- [ ] Course editor - course, group, & lesson
- [ ] Course learn page - course, group, & lesson

## TODO

- [ ] Add tests
- [ ] Refactor code
- [ ] Make a design system
- [ ] Make it responsive
- [ ] Add SEO
- [ ] Optimize API requests
- [ ] Add search functionality for browsing courses
- [ ] Add search functionality for browsing course (learn & editor)

## License

[MIT](./LICENSE)

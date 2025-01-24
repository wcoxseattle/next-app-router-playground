//'use client';

import { notFound } from 'next/navigation';
import { Dummy } from './dummy';

// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's
// good practise to add `server-only` preemptively.

export async function getDummies() {
  //const res = await fetch(`http://localhost:5076/api/Dummy`); //TODO - Delete if below works
  const res = await fetch(`/api/Dummy`);

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('Something went wrong!');
  }

  const dummies = (await res.json()) as Dummy[];

  if (dummies.length === 0) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  return dummies;
}

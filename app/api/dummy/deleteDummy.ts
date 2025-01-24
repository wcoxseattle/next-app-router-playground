'use client'; //Changed from server-only

import { notFound } from 'next/navigation';
import { Dummy } from './dummy';

// `server-only` guarantees any modules that import code in file
// will never run on the client. Even though this particular api
// doesn't currently use sensitive environment variables, it's
// good practise to add `server-only` preemptively.

import { UUID } from 'crypto';

export async function deleteDummy(id: UUID) {
  const settings = {
    method: 'DELETE',
  };
  const res = await fetch(`/api/Dummy/?id=${id}`, settings);

  if (!res.ok) {
    // Render the closest `error.js` Error Boundary
    throw new Error('deleteDummy failed!');
  }

  const myResponse = await res.json();

  if (myResponse.length === 0) {
    // Render the closest `not-found.js` Error Boundary
    notFound();
  }

  //TODO - What should this return?
  return myResponse;
}

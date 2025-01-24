'use client';

import { demos } from '#/lib/demos';
import Link from 'next/link';
//import { getDummies } from './api/dummy/getDummies';
//import { deleteDummy } from './api/dummy/deleteDummy';
import { ButtonHTMLAttributes, MouseEventHandler } from 'react';
import useSWR from 'swr';
import { UUID } from 'crypto';

export type Dummy = {
  id: UUID;
  widget?: string;
};

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    //res.headers.set('Access-Control-Allow-Origin', 'http://localhost:3000') //TODO - Delete if unneeded
    console.log('res', res);
    console.log('res.json()', res.json());
    return res.json();
  });

export default function Page() {
  const { data, error, isLoading } = useSWR<Dummy[]>('/api/Dummy', fetcher);
  const handleDelete = (event: MouseEventHandler<HTMLButtonElement>) => {
    console.log(event);
  };

  console.log('dummies', data, error);

  return (
    <div className="space-y-8">
      <h1 className="text-xl font-medium text-gray-300">My Shit</h1>
      <div className="space-y-10 text-white">
        {data?.map((item) => {
          return (
            <div key={item.id} className="space-y-5">
              <div className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                {item.widget}
              </div>
              <div>
                <button onClick={() => handleDelete}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      <h1 className="text-xl font-medium text-gray-300">Examples</h1>
    </div>
  );
}

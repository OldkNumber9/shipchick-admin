// components/client-side-custom-editor.js
'use client' // Required only in App Router.

import dynamic from 'next/dynamic';

// const ClientSideCustomEditor = dynamic( () => import( './customEditor' ), { ssr: false } );
const ClientSideCustomEditor = dynamic(() => import('./customEditor'), { ssr: false });


export default ClientSideCustomEditor;

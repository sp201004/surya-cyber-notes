import React from 'react';
import { renderToString } from 'react-dom/server';
import NotesView from './src/components/NotesView';
import { MODULES_DATA } from './src/data';

const m3 = MODULES_DATA.find(m => m.id === 'how-the-web-works');
if (!m3) throw new Error('no m3');

m3.topics.forEach(topic => {
  console.log(`Rendering ${topic.id}...`);
  try {
    const html = renderToString(
      <NotesView 
        topic={topic}
        onBack={() => {}}
        onCompleteTopic={() => {}}
        userPoints={0}
        completedTopics={[]}
      />
    );
    console.log(`Success ${topic.id}, length: ${html.length}`);
  } catch(e) {
    console.error(`Error rendering ${topic.id}:`, e);
  }
});

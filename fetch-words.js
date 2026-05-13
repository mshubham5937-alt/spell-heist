import https from 'https';
import fs from 'fs';

https.get('https://raw.githubusercontent.com/tabatkins/wordle-list/main/words', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const words = data.split('\n')
      .map(w => w.trim().toUpperCase())
      .filter(w => w.length === 5 && /^[A-Z]+$/.test(w));
    
    // Add adieu if missing
    if (!words.includes('ADIEU')) words.push('ADIEU');
    
    // De-duplicate
    const uniqueWords = [...new Set(words)].sort();
    
    fs.writeFileSync('src/data/dictionary.json', JSON.stringify(uniqueWords));
    console.log('Saved ' + uniqueWords.length + ' words');
  });
}).on('error', (e) => {
  console.error(e);
  process.exit(1);
});

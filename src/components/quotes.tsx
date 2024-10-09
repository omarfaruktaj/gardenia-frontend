// export default function Quotes() {
//   const quotes = [
//     {
//       text: 'To plant a garden is to believe in tomorrow.',
//       author: 'Audrey Hepburn',
//     },

//     {
//       text: 'The glory of gardening: hands in the dirt, head in the sun, heart with nature.',
//       author: 'Alfred Austin',
//     },
//     {
//       text: 'Gardens are not made by singing ‘Oh, how beautiful,’ and sitting in the shade.',
//       author: 'Rudyard Kipling',
//     },
//   ];

//   return (
//     <div className="mt-16">
//       {/* <header className="text-center py-2 ">
//         <h1 className="text-xl font-bold">Quotes</h1>
//       </header>

//       <div className="hidden md:block">
//         <div className="grid grid-cols-1 gap-4">
//           {quotes.map((quote, index) => (
//             <Card key={index} className=" bg-transparent shadow-lg rounded-lg">
//               <CardHeader className="text-center">
//                 <CardTitle className="text-lg italic text-gray-700">{`"${quote.text}"`}</CardTitle>
//               </CardHeader>
//               <CardContent className="text-center">
//                 <CardDescription className="mt-4 text-green-700 font-semibold">{`– ${quote.author}`}</CardDescription>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div> */}

//       <div className="bg-white rounded-lg p-4 mb-6">
//         <h3 className="font-semibold mb-2">Inspirational Quotes</h3>
//         <ul className="space-y-2">
//           <li className="text-gray-500">
//             “To plant a garden is to believe in tomorrow.” — Audrey Hepburn
//           </li>
//           <li className="text-gray-500">
//             “Gardening is a way of showing that you believe in tomorrow.” —
//             Anonymous
//           </li>
//           <li className="text-gray-500">
//             “The love of gardening is a seed once sown that never dies.” —
//             Gertrude Jekyll
//           </li>
//           <li className="text-gray-500">
//             “A garden is a friend you can visit any time.” — Anonymous
//           </li>
//           <li className="text-gray-500">
//             “Gardening adds years to your life and life to your years.” —
//             Anonymous
//           </li>
//           <li className="text-gray-500">
//             “In every gardener, there is a child who believes in the seed
//             fairy.” — Anonymous
//           </li>
//           <li className="text-gray-500">
//             “He who plants a garden plants happiness.” — Chinese Proverb
//           </li>
//           <li className="text-gray-500">
//             “The earth laughs in flowers.” — Ralph Waldo Emerson
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// }

const quotes = [
  'To plant a garden is to believe in tomorrow. — Audrey Hepburn',
  'Gardening is a way of showing that you believe in tomorrow. — Anonymous',
  'The love of gardening is a seed once sown that never dies. — Gertrude Jekyll',
  'A garden is a friend you can visit any time. — Anonymous',
  'Gardening adds years to your life and life to your years. — Anonymous',
  // 'In every gardener, there is a child who believes in the seed fairy. — Anonymous',
  // 'He who plants a garden plants happiness. — Chinese Proverb',
  // 'The earth laughs in flowers. — Ralph Waldo Emerson',
];

const QuotesComponent = () => {
  return (
    <div className="space-y-4 lg:border lg:p-4 lg:rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Gardening Quotes</h2>
      <div className="flex flex-col space-y-4">
        {quotes.map((quote, index) => (
          <div
            key={index}
            className=" rounded-lg border p-4 shadow hover:shadow-lg transition-shadow duration-300"
          >
            <p className="text-muted-foreground italic text-center">{quote}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuotesComponent;

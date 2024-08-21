// import { H3, UILink } from "@/components/UI";
// import useApi from "@/helpers/apiRequest";
// import { Select } from "antd";
// import { useEffect, useState } from "react";

// export const SearchGames = () => {
//   const { fetchData } = useApi();
//   const [games, setGames] = useState([]);
//   const [selectedGame, setSelectedGame] = useState(null);

//   useEffect(() => {
//     // Fetch games from your API endpoint
//     const fetchGames = async () => {
//       try {
//         const response = await fetchData("/searchGames", "GET");
//         setGames(response.games);
//       } catch (error) {
//         console.error("Error fetching games:", error);
//       }
//     };

//     fetchGames();
//   }, []);

//   const currencyOptions = games.map((game) => ({
//     value: game.name,
//     label: game.name,
//   }));

//   return (
//     <>
//       <div className=" w-3/6 m-auto gap-4 tab:gap-5 laptop:gap-7 items-center px-5 py-4 bg-bg-color2 rounded-lg">
//         <H3 name="Search A Games" className="mb-2 text-center" />
//         <Select
//           showSearch
//           placeholder="Select a game"
//           onChange={(value) => {
//             setSelectedGame(value);
//           }}
//           value={selectedGame}
//           className="w-full text-xl"
//         >
//           {games.map((game) => (
//             <Select.Option key={game.id} value={game.name}>
//               <UILink
//                 href="/slots"
//                 name={game.name}
//                 className="!text-text-color-primary"
//               />
//             </Select.Option>
//           ))}
//         </Select>
//       </div>
//     </>
//   );
// };

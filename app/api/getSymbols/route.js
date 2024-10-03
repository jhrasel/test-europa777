export async function GET(req) {
  const url = new URL(req.url); // Use URL constructor to parse the request URL
  const canWinParam = url.searchParams.get("canWin"); // Extract 'canWin' from query parameters

  // Convert the string 'canWin' into a boolean (check for 'true', otherwise it will be false)
  const canWin = canWinParam === "true";

  try {
    const symbolsList = [
      0.25, 0.5, 0.75, 0.8, 1, 2, 3, 5, 10, 20, 50, 100, 200, 500, 1000,
    ];
    const symbolCount = 15;
    const displayedSymbols = 9;
    const probabilities = [
      0.1, // 0.25
      0.1, // 0.5
      0.1, // 0.75
      0.1, // 0.80
      0.1, // 1.0
      0.05, // 2.0
      0.05, // 3.0
      0.05, // 5.0
      0.05, // 10.0
      0.02, // 20.0
      0.02, // 50.0
      0.02, // 100.0
      0.05, // 200.0
      0.1, // 500.0
      0.2, // 1000.0
    ];

    let symbols = [];
    let winnerSymbol = null;
    let count = Array(symbolCount).fill(0);

    const getRandomSymbolIndex = () => {
      const rand = Math.random();
      let cumulativeProbability = 0;

      for (let i = 0; i < probabilities.length; i++) {
        cumulativeProbability += probabilities[i];
        if (rand < cumulativeProbability) {
          return i;
        }
      }

      return Math.floor(Math.random() * 3); // Fallback to a random index between 0 and 2
    };

    while (symbols.length < displayedSymbols) {
      let symbol = getRandomSymbolIndex();

      // Limit symbols 50 - 1000 to only appear twice max
      if (symbol > 9 && count[symbol] === 2) {
        continue;
      }

      // Prevent more than one winner
      if (winnerSymbol !== null && count[symbol] === 2) {
        continue;
      }

      if (count[symbol] < 3) {
        count[symbol]++;
        symbols.push(symbol);

        // When symbol reaches 2 occurrences, probabilistically prevent a 3rd match
        if (count[symbol] === 3) {
          if (winnerSymbol === null && canWin) {
            // 30% chance to allow a winner
            winnerSymbol = symbol;
          } else {
            // Block the third occurrence to reduce winner probability
            count[symbol]--;
            symbols.pop(); // Remove the last added symbol to prevent 3rd match
          }
        }
      }
    }

    const result = symbols.map((item) => symbolsList[item]);

    return new Response(JSON.stringify({ symbols: result }), {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get symbols" }), {
      status: 500,
    });
  }
}

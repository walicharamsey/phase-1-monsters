document.addEventListener('DOMContentLoaded', () => {
    const monsterForm = document.getElementById('monster-form');
    const monsterContainer = document.getElementById('monster-container');
    const loadMoreButton = document.getElementById('load-more');
    let currentPage = 1;
  
    // Function to fetch and display monsters
    function fetchMonsters() {
      const url = `http://localhost:3000/monsters/?_limit=50&_page=${currentPage}`;
  
      fetch(url)
        .then((response) => response.json())
        .then((monsters) => {
          // Iterate through the monsters and display them in the monsterContainer
          monsters.forEach((monster) => {
            const monsterDiv = document.createElement('div');
            monsterDiv.innerHTML = `
              <h2>${monster.name}</h2>
              <p>Age: ${monster.age}</p>
              <p>Description: ${monster.description}</p>
            `;
            monsterContainer.appendChild(monsterDiv);
          });
        });
    }
  
    // Function to create a new monster
    function createMonster(event) {
      event.preventDefault();
  
      const name = document.getElementById('name').value;
      const age = document.getElementById('age').value;
      const description = document.getElementById('description').value;
  
      const url = 'http://localhost:3000/monsters';
      const data = {
        name: name,
        age: parseInt(age),
        description: description,
      };
  
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((monster) => {
          // Display the newly created monster in the monsterContainer
          const monsterDiv = document.createElement('div');
          monsterDiv.innerHTML = `
            <h2>${monster.name}</h2>
            <p>Age: ${monster.age}</p>
            <p>Description: ${monster.description}</p>
          `;
          monsterContainer.appendChild(monsterDiv);
  
          // Clear the form fields
          document.getElementById('name').value = '';
          document.getElementById('age').value = '';
          document.getElementById('description').value = '';
        });
    }
  
    // Event listener for the "Create Monster" button
    monsterForm.addEventListener('submit', createMonster);
  
    // Event listener for the "Load More" button
    loadMoreButton.addEventListener('click', () => {
      currentPage++;
      fetchMonsters();
    });
  
    // Initial fetch when the page loads
    fetchMonsters();
  });
  
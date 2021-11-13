import React, { useState } from "react";
import { Link } from "react-router-dom";

function Top10({ breeds }) {
  const [popList, setPopList] = useState([]);

  if (breeds.length !== 0 && popList.length === 0 && popList[0] !== 'loading') {
    fetch(
      window.location.protocol +
        "//" +
        window.location.hostname +
        ":8080/cat-popularity",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setPopList(['loading'])
        let popListData = data.slice(0, 10).map((popBreed) => {
          let cat = breeds.filter(catList => catList.id === popBreed[0])[0];
          let position = data.indexOf(popBreed) + 1;
          return (
            <Link
              to={("cat/" + cat.name)
                .replace(/-/g, "_")
                .replace(/ /g, "-")
                .toLowerCase()}
              className="top-entry"
              onClick={setPopularity}
              breed={cat.id}
            >
              <div className="top-image">
                <img
                  src={cat.image.url}
                  alt={cat.name}
                  width="100%"
                  style={{ aspectRatio: "1/1", objectFit: "cover" }}
                />
              </div>
              <div className="top-description">
                <h4>
                  {position}. {cat.name}
                </h4>
                <p>{cat.description}</p>
              </div>
            </Link>
          );
        });
        setPopList(popListData);
      });
  }

  function setPopularity(e) {
    let breed = e.currentTarget.attributes.breed.value;
    fetch(window.location.protocol+'//'+window.location.hostname+':8080/cat-pop-add/' + breed, {
        method: 'POST'
      })
      .then(res => res.json())
      .then(data => {
        
      })
  }

  return (
    <div>
      <h4 style={{ fontWeight: "700" }}>Top 10 most searched breeds</h4>
      <div id="top-list">{popList}</div>
    </div>
  );
}

export default Top10;

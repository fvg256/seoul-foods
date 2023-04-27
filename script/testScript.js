console.log("테스트실행");

const pageInfo = {
  page: 0,
};

const fetched = async (page) => {
  pageInfo.page += 1;
  const response = await fetch(
    `https://api.odcloud.kr/api/15097008/v1/uddi:1e5a6f2e-3f79-49bd-819b-d17541e6df78?page=${pageInfo.page}&perPage=12&serviceKey=OIoUbIn9ntbVNJbEIG3qi5VeWUk%2FDBR723Z1QwsCYKvDB4c3XLsXcSzA%2B8X6mkn7lZaXWpUUFTEEqX%2BvyIOqlQ%3D%3D`,
    {
      method: "GET",
      headers: {},
    }
  );
  return await response.json();
};

const likeList = [];

const makeItem = (resItem) => {
  const list = document.querySelector("#store-list");
  const item = document.createElement("div");
  item.className = "store-item";
  item.id = resItem["음식이미지(ID)"];
  const image = document.createElement("img");
  image.src = resItem["음식이미지(URL)"];
  image.className = "store-image";
  const storeInfo = document.createElement("div");
  storeInfo.className = "store-info";
  const storeName = document.createElement("div");
  storeName.innerHTML = resItem["식당명"];
  storeName.className = "store-name";
  const storeAdd = document.createElement("div");
  storeAdd.className = "store-add";
  storeAdd.innerHTML = resItem["지역명"];

  const likeImage = document.createElement("img");
  likeImage.src = "./img/heart.png";
  likeImage.className = "like-image";

  item.addEventListener("click", (e) => {
    const index = likeList.findIndex((item) => {
      return item["음식이미지(ID)"] === resItem["음식이미지(ID)"];
    });
    if (index === -1) {
      likeList.push(resItem);
      likeImage.className = "like-image selected";
    } else {
      likeList.splice(index, 1);
      likeImage.className = "like-image";
    }
    drawMarkItem();
  });

  storeInfo.appendChild(storeAdd);
  storeInfo.appendChild(storeName);
  storeInfo.appendChild(likeImage);
  item.appendChild(image);
  item.appendChild(storeInfo);
  list.appendChild(item);
};

const makeMarkItem = (resItem) => {
  const list = document.querySelector("#mark-list");
  const item = document.createElement("div");
  item.className = "mark-item";
  item.id = resItem["음식이미지(ID)"];
  const image = document.createElement("img");
  image.src = resItem["음식이미지(URL)"];
  image.className = "store-image";
  const storeName = document.createElement("div");
  storeName.innerHTML = resItem["식당명"];
  storeName.className = "store-name";
  // const deleteImage = document.createElement("img");
  // deleteImage.src = "./img/delete.png";
  // deleteImage.className = "delete-image";
  // deleteImage.addEventListener("click", (e) => {
  //   const index = likeList.findIndex((item) => {
  //     return item["음식이미지(ID)"] === resItem["음식이미지(ID)"];
  //   });
  //   likeList.splice(index, 1);
  // });

  item.appendChild(image);
  item.appendChild(storeName);
  // item.appendChild(deleteImage);
  list.appendChild(item);
};

const drawItem = async () => {
  const res = await fetched();
  console.log("data", res);
  res.data.forEach((storeData) => {
    makeItem(storeData);
  });
};

const drawMarkItem = () => {
  const list = document.querySelector("#mark-list");
  list.innerHTML = "";
  likeList.forEach((storeData) => {
    makeMarkItem(storeData);
  });
};

drawItem();

document.querySelector("#more-button").addEventListener("click", () => {
  drawItem();
});

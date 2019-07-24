import React from "react";
import namor from "namor";
import "./index.css";
import data from "./whatsonvmb";

//var subKey;
const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    firstName: namor.generate({ words: 1, numbers: 0 }),
    lastName: namor.generate({ words: 1, numbers: 0 }),
    age: Math.floor(Math.random() * 30),
    visits: Math.floor(Math.random() * 100),
    progress: Math.floor(Math.random() * 100),
    status:
      statusChance > 0.66
        ? "relationship"
        : statusChance > 0.33 ? "complicated" : "single"
  };
};

export function makeData(len = 55) {
  return range(len).map(d => {
    return {
      ...newPerson(),
      children: range(10).map(newPerson)
    };
  });
}

export function getValues(){
	return data;
}

export function getChildValues(data, index){
	//console.log(data[index].topicsByAppList);
	return data[index].topicsByAppListArr;
}

export function getColumns() {
    return Object.keys(data[0]).map(key => {
	  // to make the columns dynamic for any data
	  //console.log(typeof(data[0][key]));
	  /*
	  if(typeof(data[0][key] === 'object')){
		  subKey = key;
		  console.log(subKey);
	  }
	  */
      return {
        Header: key.toUpperCase(),
        accessor: key
      };
    });
}

export function getSubColumns() {
    return Object.keys(data[0].topicsByAppList[0]).map(key => {
      return {
        Header: key.toUpperCase(),
        accessor: key
      };
    });
}

export const Tips = () =>
  <div style={{ textAlign: "center" }}>
    <em>Tip: Hold shift when sorting to multi-sort!</em>
  </div>;

import React from "react";

const generateUniversityId = async (university, country) => {
  const uniPart = university.trim().slice(0, 3).toUpperCase();
  const countryPart = country.trim().slice(0, 3).toUpperCase();
  const randomPart = Math.floor(10 + Math.random() * 90); // random 2-digit number

  return `${uniPart}${countryPart}${randomPart}`; // e.g., STAUUS42
};

export default generateUniversityId;

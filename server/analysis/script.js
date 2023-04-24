// scrapper for google
const nodesArr = Array.from(document.querySelectorAll('cite[role="text"]'));
const allLinks = nodesArr
  .map((y) => {
    const linksStr = y.innerText.split("›")[0].trim();
    if (linksStr.endsWith(".np")) return linksStr;
    else return "";
  })
  .filter((s) => s.length > 0);

const uniqueLinks = [...new Set(allLinks)].splice(0, 6);

const strLinks = uniqueLinks.join(", ");

console.log(strLinks);

// scrapper for noogle
const articles = Array.from(document.querySelectorAll("article"));
const links = articles.map((a) => {
  return a.childNodes[0].childNodes[0].innerText;
});
const top6Links = links.splice(0, 6).join(", ");
console.log(top6Links);

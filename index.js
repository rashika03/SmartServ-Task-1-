let tableData = [];
function createRow(title,price){
    let row = document.createElement('tr');
    let titleNode = document.createElement('td');
    let priceNode = document.createElement('td');
    titleNode.innerText = title;
    priceNode.innerText = price;
    row.appendChild(titleNode);
    row.appendChild(priceNode);
    return row;
}
function addDataToUI(){
    let tableNode = document.getElementById('mytable');
    tableData.forEach(obj => {
        tableNode.appendChild(createRow(obj.title,obj.price));
    });
}
function extractAndStore(data){
    for(key in data){
        let item = data[key];
        tableData.push({
            title: item.title,
            price : item.price,
            popularity: item.popularity
        });
    }
    tableData.sort((a,b) => {
        if(parseInt(a.popularity) > parseInt(b.popularity))
            return -1;
        else 
            return 1;
    });
    console.log(tableData);
    addDataToUI();
}
function loadData(){
    let url = 'https://s3.amazonaws.com/open-to-cors/assignment.json';
    fetch(url)
        .then((res) => res.json())
        .then((data) => extractAndStore(data?.products));
}
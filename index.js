const http = require("http");
const { URL } = require("url");

let products = [
  { id: 1, name: "Pixel", price: 192, },
  { id: 2, name: "POCO x7", price: 329,  },
  { id: 3, name: "Samsung S24", price: 329, },
  { id: 4, name: "Vivo", price: 214,  },
  { id: 5, name: "Iphone", price: 1444, },
];

let users=[
  {id:1,name:"Jhon",login:"Jhon1111",password:1234},
  {id:2,name:"Alex",login:"Alex1111",password:7777},
  {id:3,name:"Mora",login:"Mora1234",password:7070},
  {id:4,name:"Lia",login:"Lia9090",password:4560},
  {id:5,name:"Stiv",login:"Stiv8080",password:4321},
  {id:6,name:"karl",login:"karl1234",password:54},
]


const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  let url = req.url;
  let met = req.method;
  

  if (url.startsWith("/products") && met == "GET") {
    let parsed = new URL(url, `http://${req.headers.host}`);
    let mp = parsed.searchParams;
    let temp = 0;
    let filtered = [];
    products.forEach((el) => {
      for (const [key, val] of mp) {
        console.log(el[key]);
        if (el[key] == val) {
          console.log(el);
        } else {
          temp = 1;
        }
      }
      if (temp == 0) {
        filtered.push(el);
      }
      temp = 0;
    });

    res.end(JSON.stringify(filtered));
  }
  else if (url.startsWith("/products") && met=="POST") {
    let Nline=''
    req.on("data",(ch)=>{
      Nline+=ch
    })
    req.on("end",()=>{
      console.log(JSON.parse(Nline));
      Nline=JSON.parse(Nline)
      let newid=products[products.length-1]?.id?products[products.length-1]?.id+1:1;
      console.log(newid);
      Nline.id=newid
      products.push(Nline)
      res.end(JSON.stringify(products))
    })   
  } 
  else if (url.startsWith("/products") && met=="PATCH") {
    let n=''
    req.on("data",(ch)=>{
      n+=ch
    })
    req.on("end",()=>{
    console.log(JSON.parse(n));
    let id=url.split('/')[2]
    let prod=products.find((x)=>x.id==id)
    let ind=products.indexOf(prod)    
    let udated={...user,...JSON.parse(n)}
    console.log(udated);
    products.splice(ind,1,udated)
    res.end(JSON.stringify(products))
    })
  }
  else if (url.startsWith("/products") && met=="DELETE") {
    let id=url.split('/')[2]
    let prod=products.find((x)=>x.id==id)
    let ind=products.indexOf(prod)    
    products.splice(ind,1)
    res.end(JSON.stringify(products))
  }

  else if(url.startsWith("/users/register") && met=="POST"){
    let Nline=''
    req.on("data",(ch)=>{
      Nline+=ch
    })
    req.on("end",()=>{
      console.log(JSON.parse(Nline));
      Nline=JSON.parse(Nline)
      let newid=users[users.length-1]?.id?users[users.length-1]?.id+1:1;
      Nline.id=newid
      users.push(Nline)
      res.end(JSON.stringify(users))
    })   
  }
});

server.listen(3000, () => {
  console.log("ishladi");
});


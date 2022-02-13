const promist = new Promise();

async function main(){
    return "test"
}


// async 안에 있는 return을 돌려받기 위해서는 
// var result =  await main();
// main().then((name) => ...)
// const name = await main();
 
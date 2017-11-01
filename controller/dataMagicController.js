// will need to require in mongoose models 
// const Files = require('../model/FolderModel.js').fileSchema;
// const Folder = require('../model/FolderModel.js').folderSchema;
const request = require('request');

// first finish recursion solution -- console log all files/folders/files within 
// then focus on database after

const dataMagicController = {};
dataMagicController.startPoint = (body) => {
  console.log('ROOT: >>>>>>>>>>>');
  console.log(body);

  let cache = [];
  
  return dataMagicController.parseBody(body);
}


// let bank = []; //bank where you get cache('CASH') GET IT? LOL



dataMagicController.parseBody = (body) => {
  //ignore: For database purposes later (maybe)
              // let bulkWriteArray = []; 
              // object with file names = contents 
              // push object to bulwriteArray
  const bank = [];
  let fileProp;

  for (var i = 0; i < body.length; i++) {
    if (body[i].type === 'dir') {
      console.log('INSIDE >>>>>>>>>>>    FOLDER:     ' + body[i].name.toUpperCase())
      const options = {
        method: 'GET',
        url: body[i].url,
        headers:
        {
          'User-Agent': 'Project-Githug',
        },
      }
      let folderBody = request(options, (error, response, body) => {
        if (error) throw new Error(error);
        return (JSON.parse(body));
      });

      bank.push(dataMagicController.parseBody(folderBody));
    }

    if (body[i].type === 'file') {
      console.log('INSIDE >>>>>>>>>>>    FILE:       ' + body[i].name.toUpperCase())
      let fileProp = {
        name: body[i].name,
        sha: body[i].sha,
        type: body[i].type,
        url: body[i].url,
        dependencies: dataMagicController.grabDependencies(body[i].url),
      };
      bank.push(fileProp);
    }
  }

  console.log(bank);
};

dataMagicController.grabDependencies = (fileURL) => {
  // GET REQUEST USING FILEURL + SHA
  // WILL NEED TO GET BODY AND DECODE DAT SHIIIIIII
  return ['DEPENDENCIES', 'GO', 'HERE']; // for now to test flow
};

// properties to grab in file: 
  // name, sha, url, type

// Iterate through body array -- 
  // Check if body[i].type === 'file' or 'dir'
    // if file -----> grab properties + save to DB + get request to grab dependencies (?)
    //                      let dependencies = grabDependencies(file);

    // if dir ------> will to do get request to access folder + then send that request.body
    //                back into parseBody(); recursively 


module.exports = dataMagicController;
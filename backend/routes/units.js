import { Router } from 'express';

import Unit from '../models/Unit.js';
import {tokenValidation} from '../middleware/auth.js';

const router = Router();
// creating a new org unit
router.post('/divisions',tokenValidation, async (req, res) => {
  const {unitName, divisions} = req.body;
    try {
      const response = await Unit.create({
        unitName,
        divisions
      });
      console.log('Organisational Unit successfully created', response);
    } catch (error) {
      if (error.code === 11000) {
        return res.json({status: 'error', message: 'Organisational Unit already exists'})
      }
      console.log(error);
      throw error;
    }
    return res.json({status: 'ok'})
})
// retrieve units + divisions
router.get('/divisions',tokenValidation, async (req, res) => {
  const {tokenData} = req;
  const {permissions} = tokenData;
  const orgUnits = [];
  const divisions = [];
  const data = [];
  const newsManagement = [];
  const softwareReviews = [];
  const hardwareReviews = [];
  const opinionPublishing = [];
  let targetOrgUnit;
  let orgUnitsQuery;
  
  for (let i = 0; i < permissions.length; i+=1) {
    orgUnits.push(permissions[i].orgUnit);
    targetOrgUnit = permissions[i].orgUnit;
    for (let x = 0; x < permissions[i].divisions.length; x+=1) {
      divisions.push(permissions[i].divisions[x].division);
      if(targetOrgUnit === 'news management'){
        newsManagement.push(permissions[i].divisions[x].division);
      }
      if(targetOrgUnit === 'software reviews') {
        softwareReviews.push(permissions[i].divisions[x].division)
      }
      if(targetOrgUnit === 'hardware reviews') {
        hardwareReviews.push(permissions[i].divisions[x].division)
      }
      if(targetOrgUnit === 'opinion reviews') {
        opinionPublishing.push(permissions[i].divisions[x].division);
      }
    }
  };

  try {
    // eslint-disable-next-line no-unused-vars
    for await (const orgUnit of orgUnitsQuery = Unit.find({}).cursor()) {
      for (let i = 0; i < orgUnits.length; i+=1){
        if(orgUnit.unitName === orgUnits[i]) {
          for(let x = 0; x < orgUnit.divisions.length; x+=1) {
            data.push({ unitName: orgUnit.unitName, divisions: orgUnit.divisions[x]})
          } 
        }
      } 
    };
  } catch (err) {
    console.error(err)
  }
  
  const newsCredentials = [];
  const softwareCredentials = [];
  const hardwareCredentials = [];
  const opinionCredentials = [];

  for (let i = 0; i < data.length; i+=1) {
    if(data[i].unitName === 'news management' && newsManagement.includes(data[i].divisions.divisionName)){
      newsCredentials.push(data[i]);
    }
    if(data[i].unitName === 'software reviews' && softwareReviews.includes(data[i].divisions.divisionName)){
      softwareCredentials.push(data[i]);
    }
    if(data[i].unitName === 'hardware reviews' && hardwareReviews.includes(data[i].divisions.divisionName)){
      hardwareCredentials.push(data[i]);
    }
    if(data[i].unitName === 'opinion publishing' && opinionPublishing.includes(data[i].divisions.divisionName)){
      opinionCredentials.push(data[i]);
    }
  }

  console.log(` news ${newsCredentials}`);
  console.log(` software ${softwareCredentials} `);
  console.log(` hardware ${hardwareCredentials}`);
  console.log(` opinion ${opinionCredentials}`);

  const payload = {
    newsManagement: newsCredentials,
    softwareReviews: softwareCredentials,
    hardwareReviews: hardwareCredentials,
    opinionPublishing: opinionCredentials
  };


    if(data.length > 0) {
      res.status(200).json(payload);
      console.log(`Successful request for user ${tokenData.id} data sent to client`)
    } else {
      res.status(404).json({ status:'error', message:'no organisational unit or division(s) were found for this user' });
      console.log(`No resource found for the user with id ${tokenData.id}`);
    }
});

router.post('/add/credentials', tokenValidation, async (req, res) => {
  const {orgUnit, division, credentials} = req.body;
  try {
    const selectedOrgUnit = await Unit.findOne().where('unitName').equals(orgUnit)
    const divisionsArray = selectedOrgUnit.divisions
    for(let i = 0; i < divisionsArray.length; i+=1){
      if(divisionsArray[i].divisionName === division){
        divisionsArray[i].credentials.push(credentials);
      }
    }
    selectedOrgUnit.divisions = divisionsArray
    await selectedOrgUnit.save();
    console.log(`${credentials.serviceName} has been added successfully to ${division} repository of ${orgUnit}`);
    res.status(201).json({'status': 'ok', 'message': `${credentials.serviceName} has been added successfully`})
  } catch (error) {
    console.log(error);
    res.status(500).json({'status': 'error', 'message':error.message})
  }
});

router.put('/edit/credentials/', tokenValidation, async (req, res) =>{
  const {orgUnit, division, targetServiceName, credentials} = req.body;
  const {tokenData} = req;
  const {management, admin} = tokenData.roles;
  if (management || admin) {
    try {
      const selectedOrgUnit = await Unit.findOne().where('unitName').equals(orgUnit);
      const divisionsArray = selectedOrgUnit.divisions;
      for(let i = 0; i < divisionsArray.length; i+=1) {
        if(divisionsArray[i].divisionName === division) {
          for(let j = 0; j < divisionsArray[i].credentials.length; j+=1) {
            if(divisionsArray[i].credentials[j].serviceName === targetServiceName) {
              divisionsArray[i].credentials[j] = credentials;
            }
          }
        }
      }
      selectedOrgUnit.divisions = divisionsArray;
      await selectedOrgUnit.save();
      res.status(201).json({'status': 'ok', 'message': `${credentials.serviceName} has updated`})
    } catch (error) {
      console.log(error);
      res.status(500).json({'status': 'error', 'message':error.message})
    }
  } else {
    res.status(403).json({'status': 'error', 'message':'You do not have permission to edit credentials'})
    console.log(`user: ${tokenData.id} attempted to edit credentials & lacked permissions`);
  }
  
});


export default router;
import { Router } from 'express';

import Unit from '../models/Unit.js';
import {tokenValidation} from '../middleware/auth.js';

const router = Router();

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

router.get('/divisions',tokenValidation, async (req, res) => {
  const {tokenData} = req;
  const {permissions} = tokenData;
  const orgUnits = [];
  const divisions = [];
  const data = [];
  const credentials = [];
  
  for (let i = 0; i < permissions.length; i+=1) {
    orgUnits[i] = permissions[i].orgUnit;
    for (let x = 0; x < permissions[i].divisions.length; x+=1) {
      divisions[x] = permissions[i].divisions[x].division
    }
  };

  
  try {
    // eslint-disable-next-line no-unused-vars
    // eslint-disable-next-line no-undef
    for await (const orgUnit of orgUnitsQuery = Unit.find({}).cursor()) {
      for (let i = 0; i < orgUnits.length; i+=1){
        if(orgUnit.unitName === orgUnits[i]) {
          console.log('match');
          for(let x = 0; x < orgUnit.divisions.length; x+=1) {
            console.log('divisions loop');
            data.push({ unitName: orgUnit.unitName, divisions: orgUnit.divisions[x]})
          } 
        }
      } 
    };
  } catch (err) {
    console.error(err)
  }
  console.log(data);
  for (let i = 0; i < data.length; i+=1) {
    const divisionRepo = data[i].divisions.divisionName;
    for (let x = 0; x < divisions.length; x+=1) {
      const allowedDivisions = divisions[x];
      if(divisionRepo === allowedDivisions) {  
        credentials.push(data[i]);
      }
    }
  }
    console.log(credentials);
    if(data.length > 0) {
      res.send(credentials);
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
    res.status(200).json({'status': 'ok', 'message': `${credentials.serviceName} has been added successfully`})
  } catch (error) {
    console.log(error);
    res.status(500).json({'status': 'error', 'message':error.message})
  }
});

router.put('/edit/credentials/', tokenValidation, async (req, res) =>{
  const {orgUnit, division, targetServiceName, credentials} = req.body;
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
    res.status(200).json({'status': 'ok', 'message': `${credentials.serviceName} has updated`})
  } catch (error) {
    console.log(error);
    res.status(500).json({'status': 'error', 'message':error.message})
  }
});


export default router;
#!/bin/bash

function a(){
    $c =  `cat ./data/instancePublicIp.json | jq 'keys'`
}

a
# UOIT-Room-Finder-API

This is a Node API using a SQL Database, which is used for all three platforms of UOIT Room Finder.

## Link
- Visit http://uoit.yshiv.com:3000/api

## Usage
- Current API Requests
  - `@GET /class/all`
    - Parameters
      - Date *(YYYY-MM-DD)*
      - Start Time *(HH:mm:ss)*
      - End Time *(HH:mm:ss)*
    - This request also accepts an empty query and will return the open rooms at the time of request.
    - Sample Request
      - `http://uoit.yshiv.com:3000/api/class/all?date=2018-09-10&start_time=00:08:00&end_time=14:00:00`
    - Sample Response
      - `{"classes":[{"room":"EDU212","building":"Education Building","location":"43.898021, -78.863524","isLab":""},{"room":"EDU311","building":"Education Building","location":"43.898021, -78.863524","isLab":""},{"room":"EDU312","building":"Education Building","location":"43.898021, -78.863524","isLab":""},{"room":"EDU210","building":"Education Building","location":"43.898021, -78.863524","isLab":""},{"room":"EDU211","building":"Education Building","location":"43.898021, -78.863524","isLab":""},{"room":"EDU313","building":"Education Building","location":"43.898021, -78.863524","isLab":""}]}`
    
  - `@GET /class/future`
    - Parameters
      - Room **(Required)**
      - Date *(YYYY-MM-DD)* **(Required)**
      - Start Time *(HH:mm:ss)*
    - This request requires the `Room` & `Date` parameters. It will return all the classes for the day if the `Start Time` is not specified
    - Sample Request
      - `http://uoit.yshiv.com:3000/api/class/future?date=2018-09-10&start_time=00:08:00&room=UA1350`
    - Sample Response
      - `{"classes":[{"room":"UA1350","start_time":"08:10:00","end_time":"09:30:00","title":"Intro to Health Info. Mngmt.","code":"HLSC 2201U"},{"room":"UA1350","start_time":"09:40:00","end_time":"11:00:00","title":"Biology I","code":"BIOL 1010U"},{"room":"UA1350","start_time":"09:40:00","end_time":"11:00:00","title":"Intro Cell & Molecular Biology","code":"BIOL 1011U"},{"room":"UA1350","start_time":"11:10:00","end_time":"12:30:00","title":"Anatomy & Physiology I","code":"HLSC 1200U"},{"room":"UA1350","start_time":"12:40:00","end_time":"14:00:00","title":"Anatomy & Physiology I","code":"HLSC 1200U"},{"room":"UA1350","start_time":"14:10:00","end_time":"15:30:00","title":"Pathophysiology I","code":"HLSC 2460U"},{"room":"UA1350","start_time":"17:10:00","end_time":"18:30:00","title":"Adv.Solid Mech.& Stress Analys","code":"MECE 4210U"}]}`
    
  - `@GET /room/:id`
    - Parameters 
      - Room Name (Building:Room_Number)
      - Examples: UA1350, UB2050, ERC1094
    - Sample Request
      - `http://uoit.yshiv.com:3000/api/room/ua1350`
    - Sample Response
      - `{"details":[{"room":"UA1350","location":"43.944509, -78.896440","building":"Science Building (UA)"}]}`
  
  - `@GET /room/all`
    - Sample Request
      - `http://uoit.yshiv.com:3000/api/room/all`
    - Sample Response
      - `{"rooms":[{"room":"DTA212","building":"61 Charles Street Building","location":"43.897385, -78.857999"},{"room":"DTA214","building":"61 Charles Street Building","location":"43.897385, -78.857999"},{"room":"DTA216","building":"61 Charles Street Building","location":"43.897385, -78.857999"},{"room":"DTA217","building":"61 Charles Street Building","location":"43.897385, -78.857999"},{"room":"DTA218","building":"61 Charles Street Building","location":"43.897385, -78.857999"},{"room":"DTA219","building":"61 Charles Street Building","location":"43.897385, -78.857999"}.....
  
  - `@GET /room/schedule`
    - Parameters 
      - Room Name (Building:Room_Number)
      - Examples: UA1350, UB2050, ERC1094
    - Sample Request
      - `http://uoit.yshiv.com:3000/api/room/schedule?room=UA1120`
    - Sample Response
      - `{"classes":[{"day":"M","start_time":"08:10:00","end_time":"09:30:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"M","start_time":"09:40:00","end_time":"11:00:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"M","start_time":"11:10:00","end_time":"12:30:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"M","start_time":"12:40:00","end_time":"14:00:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"M","start_time":"14:10:00","end_time":"15:30:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"M","start_time":"15:40:00","end_time":"17:00:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"M","start_time":"17:10:00","end_time":"18:30:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"T","start_time":"09:40:00","end_time":"11:00:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"},{"day":"T","start_time":"11:10:00","end_time":"12:30:00","start_date":"2018-09-06T00:00:00.000Z","end_date":"2018-12-05T00:00:00.000Z"}.....
      - 

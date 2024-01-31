//общая скорость
var speed_all = 0.1
var speed_all_saved=speed_all
//яркость орбиты
var orbit_yark = 50
var SputnikShow=true;
var textShow=true;
//звёзды
var stars=true;
//массив планет
let Planets=[];
//массив спутников
let Sputniks=[];
let buttoninfo = false

//парметры добавляемой
//радиус орбиты
let r = null;
//скорость планеты
let speed = null;
//название планеты
let name = null;
//размер планеты
let radius = null;
//создание новой планеты
let ninfo = false;
let Planet_added = false;

//номер планеты по которой вводится информация
let s_planet=null;
//стандартная функция P5.js preload которая вызывается в самом начале выполнения программы (перед setup())
//её можно использовать для загрузки разных файлов
function preload()
{
  //загружаем картинки солнца и планет
  sun_image = loadImage("./source/img/The_Sun.jpg")
  mercury_image = loadImage("./source/img/mercury.jpg")
  venera_image = loadImage("./source/img/Venera.jpg")
  ground_image = loadImage("./source/img/Ground.jpg")
  mars_image = loadImage("./source/img/mars.jpg")
  jupiter_image = loadImage("./source/img/jupiter.jpg")
  saturn_image = loadImage("./source/img/Saturn.jpg")
  uran_image = loadImage("./source/img/uran.jpg")
  neptune_image = loadImage("./source/img/neptune.jpg")
  planet_image = loadImage("./source/img/Planet.jpg")
}
//стандартная функция P5.js setup() вызывается один раз при запуске программы. 
//Она используется для определения начальных свойств среды, таких как размер экрана и цвет фона, и для загрузки мультимедийных данных
//таких как изображения и шрифты, при запуске программы.Для каждой программы может быть только одна функция setup()        
function setup() 
{
  //Создает элемент canvas(прямоугольник для рисования объектов) с задаными размерами в документе и задает его размеры в пикселях.
  //Этот метод следует вызывать только один раз при запуске setup()
  createCanvas(810, 780);
  //добавление планеты
  //в массив планет добавляем новые планеты , в конструкторе задаём их параметры:x,y,theta,r_orbita,speed,name,radius,img
  Planets.push (new Planet(400,400,0,20,0.04787,'МЕРКУРИЙ',6,mercury_image));
  Planets.push (new Planet(400,400,0,50,0.03502,'ВЕНЕРА',10,venera_image));
  earth=new Planet(400,400,0,100,0.02978,'ЗЕМЛЯ',11,ground_image);
  Planets.push(earth);
  Planets.push (new Planet(400,400,0,140,0.024077,'МАРС',9,mars_image));
  jupiter= new Planet(400,400,0,250,0.01307,'ЮПИТЕР',30,jupiter_image);
  Planets.push(jupiter);
  saturn= new Planet(400,400,0,300,0.00969,'САТУРН',30,saturn_image);
  Planets.push(saturn);
  Planets.push (new Planet(400,400,0,350,0.00681,'УРАН',10,uran_image));
  Planets.push (new Planet(400,400,0,370,0.00543,'НЕПТУН',5.6,neptune_image));
  //добавление спутника
  //в массив спутников добавляем новые спутники, в конструкторе задаём их параметры:x,y,theta,r,speed,name, radius,planet,p
  Sputniks.push (new Sputnik(400,400,29.78,149,0.07978,'ЛУНА',3,earth,10));
  Sputniks.push (new Sputnik(400,400,2.70,310,0.027,'ТИТАН',5,saturn,8));
  Sputniks.push (new Sputnik(400,400,7.70,160,0.027,'ИО',2.5,jupiter,5));
  Sputniks.push (new Sputnik(400,400,100.70,200,0.017,'ЕВРОПА',2.5,jupiter,6));
  Sputniks.push (new Sputnik(400,400,150.70,260,0.013,'ГАНИМЕД',2.5,jupiter,8));
  Sputniks.push (new Sputnik(400,400,234.70,300,0.009,'КАЛЛИСТО',2.5,jupiter,9));       
}
//Вызываемая непосредственно после setup(), функция draw() непрерывно выполняет строки кода, содержащиеся внутри ее блока
//до тех пор, пока программа не будет остановлена ​​или не будет вызвана функция noLoop(). 
function draw() 
{
  question();
  //функция которая организует добавление новой планеты
  add_Planet();
  //стандартная функция Устанавливает цвет фона холста. По умолчанию фон прозрачный.
  // Эта функция обычно используется в draw() для очистки окна отображения в начале каждого кадра.
  // Его также можно использовать внутри setup() для установки фона в первом кадре анимации.
  background(0); 
  if (buttoninfo === false)
   {
    textSize(20);
    text('Нажмите кнопку I чтобы вывести информацию о клавишах управления',20,20);
    textSize(12)
   }
   else {
    text('клавиша + ускоряет анимацию движение планет и спутников',20,20);
    text('клавиша - замедляет анимацию движение планет и спутников ',20,40);
    text('клавиша p приостанавливает анимацию движение планет и спутников',20,60);
    text('клавиша s переключает режим отображения спутников',20,80);
    text('клавиша t переключает режим отображения названий',20,100);
    text('клавиша f переключает режим отображения звёзд',20,120);
    text('клавиша n включает режим добавления новой планеты',20,140);
    text('клавиши 1-8 выводит информацию о планете',20,160);
    // text('клавиша 0 ')
   }
    //создание звезд ,если переменная stars === true
    if (stars === true)
    {
      //Вызов randomSeed() с постоянным аргументом, например, randSeed(500)
      //приводит к тому, что эти функции выдают одни и те же результаты при каждом запуске 
    randomSeed(500)
    //цикл от 0 до 500
      for (var j = 0; j <= 500;j++){
        //fill Устанавливает цвет рисуемой звезды.Цвет задаётся случайно с помощью функции random
        fill(random(120,255),random(120,255),random(120,255),random(80,150))
        //circle рисует звёзды.Кординаты и размер(диаметр) задаётся случайно с помощью функции random
        circle(random(800),random(800),random(3))
      }
  }
  //создаём солнце
    fill(210,210,210)
    //выводим текст солнца
    text('Солнце',412.5,400,1);
    //рисуем картинку солнца в центре экрана
    image(sun_image,400-12.5,400-12.5,25,25)
    //в цикле рисуем все планеты, вызывая метод draw_Planet для каждой планеты
    for (let Planet of Planets)
    {
      Planet.draw_Planet();
    }
    if (SputnikShow === true)
    {
    //в цикле рисуем все спутники,вызывая метод draw_Sputnik для каждого спутника
    for (let Sputnik of Sputniks)
    {
      Sputnik.draw_Sputnik();  
    }
  }
  //выводим информацию о соответсвующей планете если нажата клавиша от 1 до 8
  show_info();
}
//стандартная Функция keyPressed() вызывается один раз при каждом нажатии клавиши. 
//KeyCode для нажатой клавиши сохраняется в переменной keyCode.
function keyPressed()
{
  //alert(keyCode)
  //замедляем анимацию движение планет и спутников(клавиша -)
  if (keyCode === 109)
  {
   speed_all=speed_all-0.1;

   if (speed_all<0)
    speed_all=0;
  }
  //ускоряем анимацию движение планет и спутников(клавиша +)
  else if (keyCode === 107)
  {
   speed_all=speed_all+0.1;
  }
  //приостанавливаем анимацию движение планет и спутников(клавиша p)
  else if (keyCode === 80)
  {
    if (speed_all===0)
    {
        speed_all=speed_all_saved;
    }
    else
    {
        speed_all_saved=speed_all;
        speed_all=0;
    }
  }
  //переключаем режим отображения спутников(клавиша s)
  if (keyCode === 83)
  {
    if(SputnikShow === true)
    {

        SputnikShow=false
    }
    else{
      SputnikShow = true
    }
  }
  //переключаем режим отображения названий(клавиша t)
  if (keyCode === 84)
  {
   if (textShow === true)
   {
    textShow= false
   }
   else
   {
    textShow= true
   }
  }
  //переключаем режим отображения звёзд(клавиша f)
   if(keyCode === 70) 
  {
    if (stars === true)
    {
     stars=false
    }
    else
    {
     stars=true
    }
    
  }
  //влючаем режим добавления новой планеты(клавиша n)
   if(keyCode === 78){
    if (ninfo === false)
    {
      ninfo=true
    }
    else{
      ninfo=false
    }
   }
   //номер планеты о которой отображается информация
   if(keyCode === 49)
   {
    s_planet = 1
   }
   if(keyCode=== 50)
   {
    s_planet = 2
   }
   if(keyCode === 51)
   {
    s_planet = 3
   }
   if(keyCode === 52)
   {
    s_planet = 4
   }
   if(keyCode === 53)
   {
    s_planet = 5
   }
   if(keyCode === 54)
   {
    s_planet = 6
   }
   if(keyCode === 55)
   {
    s_planet = 7
   }
   if(keyCode === 56)
   {
    s_planet = 8
   }

   if(keyCode === 48)
   {
     s_planet = false
     textSize(12);
   }
   if (keyCode === 73)
   {
    if (buttoninfo === false)
         buttoninfo = true
    else 
    {
      buttoninfo = false
    }
   }

}
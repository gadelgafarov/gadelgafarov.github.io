//class описывающий свойства и реализующий поведение и отображение планет
class Planet {
    //construktor - функция создающий объект планеты
    constructor(x,y,theta,r_orbita,speed,name,radius,img)
    {
      this.x=x;
      this.y=y;
      //начальный угол(положение планеты)
      this.theta = theta;
    //   радиус орбиты
      this.r_orbita = r_orbita;
      //орбитальная скорость
      this.speed = speed;
      //название
      this.name=name;
      //радиус
      this.radius=radius
      //картинка
      this.img=img
    }
    //функция которая вычисляет кординаты планет и рисует планеты
    draw_Planet(){
    // вычисляем кординаты по формуле
      this.x=this.r_orbita*sin(this.theta);
      this.y=this.r_orbita*cos(this.theta);
    //текст
    if (textShow === true)
       text(this.name,this.x+400+this.radius/2,this.y+400+this.radius/2,1);
    // цвет орбиты
    stroke(255,165,3,orbit_yark);
      noFill(255);
    //   рисуем орбиты(круги)
    circle(400,400,this.r_orbita * 2);
    noStroke();
    fill(255);
      if (this.img!=null)
      {
      // если у планеты есть картинка , то рисуем планету
        image(this.img,this.x+400-this.radius,this.y+400-this.radius,this.radius * 2 ,this.radius * 2)
      }
      else {
        // иначе рисуем окружность
        circle(this.x+400,this.y+400,this.radius);
      }
    // движение планеты, изменяем угол планеты
      this.theta = this.theta + this.speed * speed_all;
    }
  }
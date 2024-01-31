//class описывающий свойства и реализующий поведение и отображение спутников
class Sputnik{
    //construktor - функция создающий объект спутника
    constructor(x,y,theta,r,speed,name, radius,planet,p)
  {
    this.x=x;
    this.y=y;
    //начальный угол(положение спутника)
    this.theta = theta;
    this.r = r;
    //орбитальная скорость
    this.speed = speed;
    //название
    this.name=name;
    //радиус
    this.radius=radius
    //планета к которой привязан спутник
    this.planet=planet
    //расстояние от центра планеты
    this.p=p
  }
  //функция которая вычисляет кординаты спутников и рисует спутники
  draw_Sputnik(){
    fill(200,200,200);
    // вычисляем кординаты по формуле
          this.x=+this.r*sin(this.theta)/this.p;
          this.y=+this.r*cos(this.theta)/this.p;
        //   текст
          if (textShow === true)
          text(this.name,this.planet.x+400+this.x,this.planet.y+400+this.y,1);
          circle(this.planet.x+400+this.x,this.planet.y+400+this.y,this.radius);
          this.theta = this.theta + this.speed * speed_all;
  }
}
const canvas=document.querySelector('#canvas1')
const ctx=canvas.getContext('2d')
canvas.width=window.innerWidth
canvas.height=window.innerHeight
// canvas.width=700
// canvas.height=700
const gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
gradient.addColorStop('0.2','pink')
gradient.addColorStop('0.3','red')
gradient.addColorStop('0.4','orange')
gradient.addColorStop('0.5','yellow')
gradient.addColorStop('0.6','green')
gradient.addColorStop('0.7','cyan')
gradient.addColorStop('0.8','violet')

const gradient2 = ctx.createRadialGradient(canvas.width * 0.5,canvas.height*0.5,100,canvas.width * 0.5,canvas.height*0.5,200)

gradient2.addColorStop('0.4','orange')
gradient2.addColorStop('0.5','yellow')
gradient2.addColorStop('0.6','green')
// gradient2.addColorStop('0.7','cyan')
// const patterImg=document.querySelector('#pattern')
// const pattern=ctx.createPattern(patterImg,'no-repeat')
// ctx.strokeStyle=pattern
//  ctx.strokeStyle=gradient

window.addEventListener('resize',()=>{
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
})

ctx.shadowOffsetX=2
ctx.shadowOffsetY=2
ctx.shadowColor='black'

class Line{
    constructor(canvas) {
        this.canvas=canvas;
        this.X=Math.random()*this.canvas.width
        this.Y=Math.random()*this.canvas.height
        // this.endX=Math.random()*this.canvas.width
        // this.endY=Math.random()*this.canvas.height
        this.history=[{x:this.X,y:this.Y}]
        this.lineWidth=Math.floor(Math.random()*15+1)
        this.hue=Math.random()*360
        this.maxLenght=Math.floor(Math.random()*150+10)
        this.speedX=Math.random()-0.5
        this.speedY=7
        this.lifeSpan=this.maxLenght*2
        this.breakPoint=this.lifeSpan*0.85
        this.timer=0
        this.angle=0
        this.curve=0.1
        this.vc=Math.random()*0.4-0.2
        this.va=Math.random()*0.5-0.25
    }

    draw(context){

        context.strokeStyle=`hsl(${this.hue},100%,50%)`
        context.lineWidth=this.lineWidth
        context.beginPath()

        context.moveTo(this.history[0].x,this.history[0].y)
        // for(let i=0;i<45;i++){
        //     this.X=Math.random()*this.canvas.width
        //     this.Y=Math.random()*this.canvas.height
        //     this.history.push({x:this.X,y:this.Y})
        // }
        for(let i=0;i<this.history.length;i++){
            context.lineTo(this.history[i].x,this.history[i].y)

        }
        context.stroke()
    }
    update(){
        this.timer++
        this.angle+=this.va
        this.curve+=this.vc
        if(this.timer<this.lifeSpan){
            if(this.timer>this.breakPoint){
                this.va*=-1.12
            }
            this.X+=Math.sin(this.angle) * this.curve
            this.Y+=Math.cos(this.angle) * this.curve
            this.history.push({x:this.X,y:this.Y})
            if(this.history.length>this.maxLenght){
                this.history.shift()
            }

        }
        else if(this.history.length <= 1){
            this.reset()
        }
        else{
            this.history.shift()
        }
    }
    reset(){
        this.X=Math.random()*this.canvas.width
        this.Y=Math.random()*this.canvas.height

        this.history=[{x:this.X,y:this.Y}]
        this.timer=0
        this.angle=0
        this.curve=0
        this.va=Math.random()*0.5-0.25
    }
}
const arrayLines=[]
const numberOfLines=60
for(let i=0;i<numberOfLines;i++){
    arrayLines.push(new Line(canvas))
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    arrayLines.forEach(object=> {
             object.draw(ctx)
            object.update()
        }
    )

    requestAnimationFrame(animate)
}
animate()





















// class Line{
//     constructor(canvas) {
//         this.canvas=canvas;
//         this.X=Math.random()*this.canvas.width
//         this.Y=Math.random()*this.canvas.height
//         // this.endX=Math.random()*this.canvas.width
//         // this.endY=Math.random()*this.canvas.height
//         this.history=[{x:this.X,y:this.Y}]
// this.lineWidth=Math.floor(Math.random()*15+1)
// this.hue=Math.random()*360
//         this.maxLenght=10
//     }
//
//     draw(context){
//
//         context.strokeStyle=`hsl(${this.hue},100%,50%)`
//         context.lineWidth=this.lineWidth
//         context.beginPath()
//
//         context.moveTo(this.history[0].x,this.history[0].y)
//         // for(let i=0;i<45;i++){
//         //     this.X=Math.random()*this.canvas.width
//         //     this.Y=Math.random()*this.canvas.height
//         //     this.history.push({x:this.X,y:this.Y})
//         // }
//         for(let i=0;i<this.history.length;i++){
//             context.lineTo(this.history[i].x,this.history[i].y)
//
//         }
//         context.stroke()
//     }
//     update(){
//         this.X=Math.random()*this.canvas.width
//         this.Y=Math.random()*this.canvas.height
//         this.history.push({x:this.X,y:this.Y})
//         if(this.history.length>this.maxLenght){
//             this.history.shift()
//         }
//     }
// }
// const arrayLines=[]
// const numberOfLines=10
// for(let i=0;i<numberOfLines;i++){
//     arrayLines.push(new Line(canvas))
// }
//
// function animate(){
//     ctx.clearRect(0,0,canvas.width,canvas.height)
//      arrayLines.forEach(object=> {
//              object.draw(ctx)
//          object.update()
//          }
//      )
//
//     requestAnimationFrame(animate)
// }
// animate()
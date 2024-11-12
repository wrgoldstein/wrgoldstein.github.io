const maxAngleChange = Math.PI / 8

export default class Circle {
    x = $state()
    y = $state()
    front = $state()
    left = $state()
    right = $state()
    constructor(x, y, radius){
        this.x = x
        this.y = y
        this.angle = 0
        this.radius = radius
        this.prevAngle = null
        this.left = null
        this.right = null
        this.followAt = null
    }

    setFollowAt(distance){
        this.followAt = distance
    }

    setFollowing(circle, distance){
        this.target = circle
        this.followAt = distance
        this.tick()
    }

    tick(){
        const distance = this.followAt
        let angle = Math.atan2(this.y - this.target.y, this.x - this.target.x)
        if (this.prevAngle != null){
            this.front = {
                x: this.x + Math.cos(0 + this.prevAngle) * this.radius,
                y: this.y + Math.sin(0 + this.prevAngle) * this.radius
            }
            this.left = {
                x: this.x + Math.cos(0.5*Math.PI + this.prevAngle) * this.radius,
                y: this.y + Math.sin(0.5*Math.PI + this.prevAngle) * this.radius
            }
            this.right = {
                x: this.x + Math.cos(1.5*Math.PI + this.prevAngle) * this.radius,
                y: this.y + Math.sin(1.5*Math.PI + this.prevAngle) * this.radius
            }
        }
        this.prevAngle = angle
        this.x = this.target.x + Math.cos(angle) * distance
        this.y = this.target.y + Math.sin(angle) * distance
    }
}

import React from "react"
import * as Babylon from "babylonjs"
import * as Materials from "babylonjs-materials"
import SceneComponent from "../Babylon_components/SceneComponent"
import sol_img from "../recursos/2k_sun.jpg"
import mercurio_img from "../recursos/2k_mercury.jpg"
import venus_img from "../recursos/2k_venus_surface.jpg"
import tierra_img from "../recursos/2k_earth_daymap.jpg"
import luna_img from "../recursos/2k_moon.jpg"
import marte_img from "../recursos/2k_mars.jpg"
import jupiter_img from "../recursos/2k_jupiter.jpg"
import saturno_anillos_img from "../recursos/2k_saturn2.jpg"
import saturno_img from "../recursos/2k_saturn.jpg"
import urano_img from "../recursos/2k_uranus.jpg"
import neptuno_img from "../recursos/2k_neptune.jpg"
import via_lactea from "../recursos/via_lactea.jpg"

const onSceneReady = (e) => {

    const { canvas, scene, engine } = e

    scene.clearColor = new Babylon.Color3(0, 0, 0)

    const camera = new Babylon.FreeCamera("camera", new Babylon.Vector3(0, 90, -150), scene)

    camera.setTarget(Babylon.Vector3.Zero())

    camera.attachControl(canvas, true)

    // const light = new Babylon.HemisphericLight("light", new Babylon.Vector3(0, 90, 0), scene)
    // light.intensity = 5

    const light = new Babylon.PointLight("light", new Babylon.Vector3(0, 10, 0), scene)
    light.intensity = 5

    /*
    const axes3D = new Babylon.AxesViewer(scene, 2)

    const ground = Babylon.MeshBuilder.CreateGround("ground", { width: 200, height: 200 }, scene)
    const groundMaterial = new Babylon.StandardMaterial("groundMaterial", scene)
    groundMaterial.diffuseTexture = new Babylon.Texture(via_lactea, scene)
    ground.material = groundMaterial
    ground.checkCollisions = true
    */

    const sol = Babylon.MeshBuilder.CreateSphere("sol", {diameter: 13}, scene)
    sol.position.set(0, 6, 0)
    let solMaterial = new Babylon.StandardMaterial("solMaterial", scene)
    solMaterial.diffuseTexture = new Babylon.Texture(sol_img, scene)
    solMaterial.emissiveColor = new Babylon.Color3(1, 1, 1)
    sol.material = solMaterial
    sol.rotation.y = degrees_to_radians(90)
    sol.checkCollisions = true

    const mercurio = Babylon.MeshBuilder.CreateSphere("mercurio", {diameter: 1}, scene)
    mercurio.position.set(10, 5, 0)
    let mercurioMaterial = new Babylon.StandardMaterial("mercurioMaterial", scene)
    mercurioMaterial.diffuseTexture = new Babylon.Texture(mercurio_img, scene)
    mercurio.material = mercurioMaterial
    mercurio.rotation.x = degrees_to_radians(0.1)
    mercurio.rotation.y = degrees_to_radians(90)
    mercurio.checkCollisions = true
    var mercurioOrbita = []
    var n = 88 // numero de puntos
    var r = 10 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        mercurioOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    mercurioOrbita.push(mercurioOrbita[0])
    var mercurioCirculo = Babylon.MeshBuilder.CreateLines("mercurioCirculo", {points: mercurioOrbita}, scene)
    mercurio.parent = mercurioCirculo

    const venus = Babylon.MeshBuilder.CreateSphere("venus", {diameter: 1.88}, scene)
    venus.position.set(20, 5, 0)
    let venusMaterial = new Babylon.StandardMaterial("venusMaterial", scene)
    venusMaterial.diffuseTexture = new Babylon.Texture(venus_img, scene)
    venus.material = venusMaterial
    mercurio.rotation.x = degrees_to_radians(177)
    venus.rotation.y = degrees_to_radians(90)
    venus.checkCollisions = true
    var venusOrbita = []
    var n = 255 // numero de puntos
    var r = 20 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        venusOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    venusOrbita.push(venusOrbita[0])
    var venusCirculo = Babylon.MeshBuilder.CreateLines("venusCirculo", {points: venusOrbita}, scene)
    venus.parent = venusCirculo

    const tierra = Babylon.MeshBuilder.CreateSphere("tierra", {diameter: 2.5}, scene)
    tierra.position.set(30, 5, 0)
    let tierraMaterial = new Babylon.StandardMaterial("tierraMaterial", scene)
    tierraMaterial.diffuseTexture = new Babylon.Texture(tierra_img, scene)
    tierra.material = tierraMaterial
    tierra.rotation.x = degrees_to_radians(23.5)
    tierra.rotation.y = degrees_to_radians(90)
    tierra.rotation.z = degrees_to_radians(180)
    tierra.checkCollisions = true
    var tierraOrbita = []
    var n = 365 // numero de puntos
    var r = 30 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        tierraOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    tierraOrbita.push(tierraOrbita[0])
    var tierraCirculo = Babylon.MeshBuilder.CreateLines("tierraCirculo", {points: tierraOrbita}, scene)
    tierra.parent = tierraCirculo

    const luna = Babylon.MeshBuilder.CreateSphere("luna", {diameter: 0.5}, scene)
    luna.position.set(33, 7, 0)
    let lunaMaterial = new Babylon.StandardMaterial("lunaMaterial", scene)
    lunaMaterial.diffuseTexture = new Babylon.Texture(luna_img, scene)
    luna.material = lunaMaterial

    const marte = Babylon.MeshBuilder.CreateSphere("marte", {diameter: 1.88}, scene)
    marte.position.set(40, 5, 0)
    let marteMaterial = new Babylon.StandardMaterial("marteMaterial", scene)
    marteMaterial.diffuseTexture = new Babylon.Texture(marte_img, scene)
    marte.material = marteMaterial
    marte.rotation.x = degrees_to_radians(25)
    marte.rotation.y = degrees_to_radians(90)
    marte.checkCollisions = true
    var marteOrbita = []
    var n = 687 // numero de puntos
    var r = 40 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        marteOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    marteOrbita.push(marteOrbita[0])
    var marteCirculo = Babylon.MeshBuilder.CreateLines("marteCirculo", {points: marteOrbita}, scene)
    marte.parent = marteCirculo

    const jupiter = Babylon.MeshBuilder.CreateSphere("jupiter", {diameter: 7}, scene)
    jupiter.position.set(50, 5, 0)
    let jupiterMaterial = new Babylon.StandardMaterial("jupiterMaterial", scene)
    jupiterMaterial.diffuseTexture = new Babylon.Texture(jupiter_img, scene)
    jupiter.material = jupiterMaterial
    jupiter.rotation.x = degrees_to_radians(3)
    jupiter.rotation.y = degrees_to_radians(90)
    jupiter.checkCollisions = true
    var jupiterOrbita = []
    var n = 4329 // numero de puntos
    var r = 50 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        jupiterOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    jupiterOrbita.push(jupiterOrbita[0])
    var jupiterCirculo = Babylon.MeshBuilder.CreateLines("jupiterCirculo", {points: jupiterOrbita}, scene)
    jupiter.parent = jupiterCirculo

    const saturno = Babylon.MeshBuilder.CreateSphere("saturno", {diameter: 5}, scene)
    saturno.position.set(60, 5, 0)
    let saturnoMaterial = new Babylon.StandardMaterial("saturnoMaterial", scene)
    saturnoMaterial.diffuseTexture = new Babylon.Texture(saturno_img, scene)
    saturno.material = saturnoMaterial
    saturno.rotation.x = degrees_to_radians(-27)
    saturno.rotation.y = degrees_to_radians(90)
    saturno.checkCollisions = true
    var saturnoOrbita = []
    var n = 10753 // numero de puntos
    var r = 60 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        saturnoOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    saturnoOrbita.push(saturnoOrbita[0])
    var saturnoCirculo = Babylon.MeshBuilder.CreateLines("saturnoCirculo", {points: saturnoOrbita}, scene)
    saturno.parent = saturnoCirculo

    const saturnoAnillos = Babylon.MeshBuilder.CreateTorus("saturnoAnillos", {diameter: 8, thickness: 2, tessellation: 100}, scene)
    saturnoAnillos.scaling = new Babylon.Vector3(1, 0.001, 1)
    let saturnoAnillosMaterial = new Babylon.StandardMaterial("saturnoAnillosMaterial", scene)
    saturnoAnillosMaterial.diffuseTexture = new Babylon.Texture(saturno_anillos_img, scene)
    saturnoAnillos.rotation.x = degrees_to_radians(-27)
    saturnoAnillos.material = saturnoAnillosMaterial
    saturnoAnillos.position.set(60, 5, 0)
    saturnoAnillos.parent = saturnoCirculo

    const urano = Babylon.MeshBuilder.CreateSphere("urano", {diameter: 5}, scene)
    urano.position.set(70, 5, 0)
    let uranoMaterial = new Babylon.StandardMaterial("uranoMaterial", scene)
    uranoMaterial.diffuseTexture = new Babylon.Texture(urano_img, scene)
    urano.material = uranoMaterial
    urano.rotation.x = degrees_to_radians(98)
    urano.rotation.y = degrees_to_radians(90)
    urano.checkCollisions = true
    var uranoOrbita = []
    var n = 30664 // numero de puntos
    var r = 70 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        uranoOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    uranoOrbita.push(uranoOrbita[0])
    var uranoCirculo = Babylon.MeshBuilder.CreateLines("uranoCirculo", {points: uranoOrbita}, scene)
    urano.parent = uranoCirculo

    const neptuno = Babylon.MeshBuilder.CreateSphere("neptuno", {diameter: 4}, scene)
    neptuno.position.set(80, 5, 0)
    let neptunoMaterial = new Babylon.StandardMaterial("neptunoMaterial", scene)
    neptunoMaterial.diffuseTexture = new Babylon.Texture(neptuno_img, scene)
    neptuno.material = neptunoMaterial
    neptuno.rotation.x = degrees_to_radians(28)
    neptuno.rotation.y = degrees_to_radians(90)
    neptuno.checkCollisions = true
    var neptunoOrbita = []
    var n = 60158 // numero de puntos
    var r = 80 // radio de la orbita
    for (var i = 0; i < n; i++) {
        var theta = 2 * Math.PI * i / n
        var x = r * Math.cos(theta)
        var z = r * Math.sin(theta)
        neptunoOrbita.push(new Babylon.Vector3(x, 0, z))
    }
    neptunoOrbita.push(neptunoOrbita[0])
    var neptunoCirculo = Babylon.MeshBuilder.CreateLines("neptunoCirculo", {points: neptunoOrbita}, scene)
    neptuno.parent = neptunoCirculo

    /**
    * funcion para convertir grados a radianes
    * @param {*} degrees 
    * @returns un mumero en radianes
    */
    function degrees_to_radians(degrees) {

        return degrees * (Math.PI / 180)
    }

    var mercurioMovimiento = 0
    var venusMovimiento = 0
    var tierraMovimiento = 0
    var marteMovimiento = 0
    var jupiterMovimiento = 0
    var saturnoMovimiento = 0
    var uranoMovimiento = 0
    var neptunoMovimiento = 0

    scene.onBeforeRenderObservable.add(() => {

        sol.rotation.y += 0.0037037
        mercurio.rotation.y += 0.00169492
        venus.rotation.y += 0.00041152
        tierra.rotation.y += 0.1
        marte.rotation.y += 0.09600614
        jupiter.rotation.y += 0.24038462
        saturno.rotation.y += 0.21819769
        urano.rotation.y += 0.014118311
        neptuno.rotation.y += 0.16

        mercurio.position.x = mercurioOrbita[mercurioMovimiento].x
        mercurio.position.z = mercurioOrbita[mercurioMovimiento].z

        venus.position.x = venusOrbita[venusMovimiento].x
        venus.position.z = venusOrbita[venusMovimiento].z

        tierra.position.x = tierraOrbita[tierraMovimiento].x
        tierra.position.z = tierraOrbita[tierraMovimiento].z

        luna.position.x = tierra.absolutePosition.x
        luna.position.z = tierra.absolutePosition.z

        marte.position.x = marteOrbita[marteMovimiento].x
        marte.position.z = marteOrbita[marteMovimiento].z

        jupiter.position.x = jupiterOrbita[jupiterMovimiento].x
        jupiter.position.z = jupiterOrbita[jupiterMovimiento].z

        saturno.position.x = saturnoOrbita[saturnoMovimiento].x
        saturno.position.z = saturnoOrbita[saturnoMovimiento].z

        saturnoAnillos.position.x = saturnoOrbita[saturnoMovimiento].x
        saturnoAnillos.position.z = saturnoOrbita[saturnoMovimiento].z

        urano.position.x = uranoOrbita[uranoMovimiento].x
        urano.position.z = uranoOrbita[uranoMovimiento].z

        neptuno.position.x = neptunoOrbita[neptunoMovimiento].x
        neptuno.position.z = neptunoOrbita[neptunoMovimiento].z

        mercurioMovimiento = (mercurioMovimiento + 1) % (mercurioOrbita.length - 1)
        venusMovimiento = (venusMovimiento + 1) % (venusOrbita.length - 1)
        tierraMovimiento = (tierraMovimiento + 1) % (tierraOrbita.length - 1)
        marteMovimiento = (marteMovimiento + 1) % (marteOrbita.length - 1)
        jupiterMovimiento = (jupiterMovimiento + 1) % (jupiterOrbita.length - 1)
        saturnoMovimiento = (saturnoMovimiento + 1) % (saturnoOrbita.length - 1)
        uranoMovimiento = (uranoMovimiento + 1) % (uranoOrbita.length - 1)
        neptunoMovimiento = (neptunoMovimiento + 1) % (neptunoOrbita.length - 1)

    })

    engine.runRenderLoop(() => {
        
        if (scene) {

            scene.render()
            
        }

    })

}

function Tarea_2() {
    
    return (
        <SceneComponent antialias onSceneReady={onSceneReady} id="SceneCanvas" />
    )

}

export default Tarea_2
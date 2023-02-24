import React from 'react'
import * as Babylon from 'babylonjs'
import * as Materials from 'babylonjs-materials'
import SceneComponent from '../Babylon_components/SceneComponent'
import * as EarCut from 'earcut'
import agua from '../recursos/agua.jpg'
import morado from '../recursos/morado.jpg'
import tierra from '../recursos/tierra.jpg'

const onSceneReady = (e) => {

    const { canvas, scene, engine } = e

    scene.checkCollisions = true

    const camera = new Babylon.FreeCamera('camera', new Babylon.Vector3(0, 10, -10), scene)

    camera.setTarget(Babylon.Vector3.Zero())

    camera.attachControl(canvas, true)

    camera.checkCollisions = true

    const light = new Babylon.HemisphericLight('light', new Babylon.Vector3(0, 180, 0), scene)
    light.intensity = 0.8

    const ground = Babylon.MeshBuilder.CreateGround('ground', { width: 100, height: 100 }, scene)
    const groundMaterial = new Babylon.StandardMaterial('groundMaterial', scene)
    groundMaterial.diffuseTexture = new Babylon.Texture(tierra, scene)
    ground.material = groundMaterial
    ground.checkCollisions = true

    let shapeScience = [
        new Babylon.Vector3(1, 1, 0),
        new Babylon.Vector3(1, 2, 0),
        new Babylon.Vector3(4, 6, 0),
        new Babylon.Vector3(4, 7, 0),
        new Babylon.Vector3(3, 7, 0),
        new Babylon.Vector3(3, 8, 0),
        new Babylon.Vector3(7, 8, 0),
        new Babylon.Vector3(7, 7, 0),
        new Babylon.Vector3(6, 7, 0),
        new Babylon.Vector3(6, 6, 0),
        new Babylon.Vector3(9, 2, 0),
        new Babylon.Vector3(9, 1, 0),
        new Babylon.Vector3(1, 1, 0)
    ]

    shapeScience.push(shapeScience[0])

    let shapeScienceExtrusion = [
        new Babylon.Vector3(0, 0, 0),
        new Babylon.Vector3(0, 0, 1),
        new Babylon.Vector3(0, 0, 2),
        new Babylon.Vector3(0, 0, 3),
        new Babylon.Vector3(0, 0, 4),
        new Babylon.Vector3(0, 0, 5)
    ]

    let PolygonScience = [
        new Babylon.Vector3(1, 0, 1),
        new Babylon.Vector3(1, 0, 2),
        new Babylon.Vector3(4, 0, 6),
        new Babylon.Vector3(4, 0, 7),
        new Babylon.Vector3(3, 0, 7),
        new Babylon.Vector3(3, 0, 8),
        new Babylon.Vector3(7, 0, 8),
        new Babylon.Vector3(7, 0, 7),
        new Babylon.Vector3(6, 0, 7),
        new Babylon.Vector3(6, 0, 6),
        new Babylon.Vector3(9, 0, 2),
        new Babylon.Vector3(9, 0, 1),
        new Babylon.Vector3(1, 0, 1)
    ]

    let polygonScienceHoles = []

    polygonScienceHoles[0] = [
        new Babylon.Vector3(1.5, 0, 1.5),
        new Babylon.Vector3(1.5, 0, 2),
        new Babylon.Vector3(4.5, 0, 6),
        new Babylon.Vector3(4.5, 0, 7.5),
        new Babylon.Vector3(3.5, 0, 7.5),
        new Babylon.Vector3(3.5, 0, 7.5),
        new Babylon.Vector3(6.5, 0, 7.5),
        new Babylon.Vector3(6.5, 0, 7.5),
        new Babylon.Vector3(5.5, 0, 7.5),
        new Babylon.Vector3(5.5, 0, 6),
        new Babylon.Vector3(8.5, 0, 2),
        new Babylon.Vector3(8.5, 0, 1.5),
        new Babylon.Vector3(1.5, 0, 1.5)
    ]

    let shapeExtrude = Babylon.MeshBuilder.ExtrudeShape("shapeExtrude", {shape: shapeScience, path: shapeScienceExtrusion, sideOrientation: Babylon.Mesh.DOUBLESIDE, updatable:true}, scene)
    shapeExtrude.position.set(0, 0, 0)
    let shapeMaterial = new Babylon.StandardMaterial("shapeMaterial", scene);
    shapeMaterial.diffuseTexture = new Babylon.Texture(agua, scene);
    shapeExtrude.material = shapeMaterial
    shapeExtrude.checkCollisions = true

    let polygon = Babylon.MeshBuilder.CreatePolygon("polygon", {shape: PolygonScience, sideOrientation: Babylon.Mesh.DOUBLESIDE}, scene, EarCut);
    polygon.position.set(10, 0, 0)
    polygon.rotation.x = degrees_to_radians(-90)
    let polygonMaterial = new Babylon.StandardMaterial("polygonMaterial", scene);
    polygonMaterial.diffuseTexture = new Babylon.Texture(morado, scene);
    polygon.material = polygonMaterial
    polygon.checkCollisions = true

    let polygonExtrude = Babylon.MeshBuilder.ExtrudePolygon("polygonExtrude", {shape: PolygonScience, holes: polygonScienceHoles, depth: 2, sideOrientation: Babylon.Mesh.DOUBLESIDE}, scene, EarCut)
    polygonExtrude.position.set(20, 0, 0)
    polygonExtrude.rotation.x = degrees_to_radians(-90)
    let polygonExtrudeMaterial = new Babylon.StandardMaterial("polygonExtrudeMaterial", scene)
    polygonExtrudeMaterial.alpha = 0.5;
    polygonExtrude.material = polygonExtrudeMaterial
    polygonExtrude.checkCollisions = true

    let spotLight = new Babylon.SpotLight("spotLight", new Babylon.Vector3(25, 10, 0), new Babylon.Vector3(0, -1, 0), degrees_to_radians(90), 10, scene)
    spotLight.diffuse = new Babylon.Color3(0, 255, 0)

    /**
    * funcion para convertir grados a radianes
    * @param {*} degrees 
    * @returns un mumero en radianes
    */
    function degrees_to_radians(degrees) {

        return degrees * (Math.PI / 180)
    }

    scene.onBeforeRenderObservable.add(() => {
    
        shapeExtrude.rotation.y += 0.01
    
    
    })

    engine.runRenderLoop(() => {

        if (scene) {

            scene.render()

        }

    })

}

function Tarea_1() {

    return (
        <SceneComponent antialias onSceneReady={onSceneReady} id='SceneCanvas'/>
    )

}

export default Tarea_1
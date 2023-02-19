// sphere courtesy https://codepen.io/ryonakae/pen/EjwwoO

// 参考：
// Processingで三角関数を使って球体を作る - Processing中毒者の嘔吐物
// http://p5aholic.hatenablog.com/entry/2015/06/15/194250


var bgColor = 0x1a1a1a;

// シーン作るぞ
var scene = new THREE.Scene();
// scene.fog = new THREE.FogExp2(bgColor, 0.004);

// カメラ作る
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.set(0,0,0);

// レンダラ作る
var renderer = new THREE.WebGLRenderer({
  antialias:true
});
renderer.setClearColor( bgColor );
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// グループつくる
var group = new THREE.Object3D();

// 半径
var radius = 600;
var separation = 5;

for ( var s = 0; s <= 180; s+=separation ) {
  // 0 <= s <= 180, なんで -1 <= Math.cos(radianS) <= 1
  // なんで zが -radius <= z <= radius
  var radianS = s*Math.PI / 180;
  var pZ = radius * Math.cos(radianS);

  // 円に沿って点描く
  for ( var t = 0; t < 360; t+=separation ) {
    // 角度をラジアンに
    var radianT = t*Math.PI / 180;
    // 点の座標を計算
    // sin(radianS)は0→1→0の順で変化する
    // radius * sin(radianS)は0→200→0になる
    var pX = radius* Math.sin(radianS) * Math.cos(radianT);
    var pY = radius* Math.sin(radianS) * Math.sin(radianT);

    var geometry = new THREE.SphereGeometry(1.5,16,16);
    var material = new THREE.MeshBasicMaterial({
      color: 0x8D9EF2
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = pX;
    mesh.position.y = pY;
    mesh.position.z = pZ;
    group.add(mesh);
  }

}

scene.add(group);

function start() {
    var rotateX = group.rotation.x + Math.random() * Math.random() < 0.5 ? 1 : -1;
    var rotateY = group.rotation.y + Math.random() * Math.random() < 0.5 ? 1 : -1;
    var rotateZ = group.rotation.z + Math.random() * Math.random() < 0.5 ? 1 : -1;
    group.rotation.set( rotateX, rotateY, rotateZ );

    camera.lookAt(scene.position);
    renderer.render(scene,camera);
}

// 毎フレームアップデートするぞ
function update() {
  // グループを回転
  var rotateX = group.rotation.x + 0.0002;
  var rotateY = group.rotation.y + 0.0005;
  var rotateZ = group.rotation.z + 0.001;
  group.rotation.set( rotateX, rotateY, rotateZ );

  // レンダリング
  camera.lookAt(scene.position);
  renderer.render(scene,camera);

  // 次のアニメーション呼び出す
  requestAnimationFrame(update);
}
start();
update();
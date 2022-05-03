import * as CANNON from 'cannon-es';

export default class PhysicsMaterial {
  public material: CANNON.ContactMaterial;
  public Impact: CANNON.Material;
  public Static: CANNON.Material;

  constructor() {
    this.Impact = new CANNON.Material('Impact');
    this.Static = new CANNON.Material('Static');
    this.material = new CANNON.ContactMaterial(this.Impact, this.Static, {
      friction: 0.1,
      restitution: 0.1,
    });
  }
}

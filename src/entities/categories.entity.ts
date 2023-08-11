import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "./real_estate.entity";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 45, nullable: false, unique: true })
  name: string;

  @OneToMany(() => RealEstate, (estate) => estate.category)
  realEstate: RealEstate[];
}

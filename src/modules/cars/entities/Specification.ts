import { v4 as uuidv4 } from 'uuid';
import { Entity, Column, PrimaryColumn, CreateDateColumn }  from 'typeorm'
@Entity('specifications')
class Specification {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: string;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export { Specification };

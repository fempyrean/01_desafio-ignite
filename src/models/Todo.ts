import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { User } from './User'

@Entity('todos')
class Todo {
  @PrimaryColumn()
  readonly id: string

  @Column()
  user_id: string

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  title: string

  @Column()
  done: boolean

  @CreateDateColumn()
  deadline: Date

  @CreateDateColumn()
  created_at: Date

  @CreateDateColumn()
  deleted_at: Date

  @CreateDateColumn()
  updated_at: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Todo }

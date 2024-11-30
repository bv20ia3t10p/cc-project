import { Entity } from "./Entity";

export class Category extends Entity {
  slug: string;
  name: string;
  url: string;
  constructor({
    slug,
    name,
    url,
  }: {
    slug: string;
    name: string;
    url: string;
  }) {
    super();
    this.slug = slug;
    this.name = name;
    this.url = url;
  }
}

import type { CollectionConfig } from 'payload'

import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import { slugField } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'

export const Artworks: CollectionConfig = {
  slug: 'artworks',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'artist', 'year', 'availability'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'artist',
      type: 'text',
      required: true,
    },
    {
      name: 'artistRef',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      admin: {
        description: 'Optional reference to a user record for the artist',
      },
    },
    {
      name: 'year',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'medium',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'dimensions',
      type: 'group',
      fields: [
        { name: 'height', type: 'number' },
        { name: 'width', type: 'number' },
        { name: 'depth', type: 'number' },
        { name: 'units', type: 'select', options: ['cm', 'in'] },
      ],
      admin: {
        description: 'Physical dimensions (height x width x depth)',
      },
    },
    {
      name: 'images',
      type: 'relationship',
      relationTo: 'media',
      hasMany: true,
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
    {
      name: 'provenance',
      type: 'richText',
      admin: {
        description: 'Ownership history and provenance',
      },
    },
    {
      name: 'exhibitionHistory',
      type: 'array',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'location', type: 'text' },
        { name: 'year', type: 'number' },
      ],
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'price',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'availability',
      type: 'select',
      options: ['available', 'sold', 'on-loan'],
      defaultValue: 'available',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  timestamps: true,
}

export default Artworks

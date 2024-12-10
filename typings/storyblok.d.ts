// This file was generated by the storyblok CLI.
// DO NOT MODIFY THIS FILE BY HAND.
import type { ISbStoryData } from "storyblok";
export interface ResumeRichtextSb {
  type: string;
  content?: ResumeRichtextSb[];
  marks?: ResumeRichtextSb[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface ResumeIndexSb {
  about?: ResumeRichtextSb;
  links?: ResumeLinkSb[];
  jobs?: (ISbStoryData<ResumeJobSb> | string)[];
  posts?: (ISbStoryData<ResumePostSb> | string)[];
  projects?: any[];
  component: "index";
  _uid: string;
  [k: string]: any;
}

export type ResumeMultilinkSb =
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      anchor?: string;
      rel?: string;
      title?: string;
      prep?: string;
      linktype: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      linktype: "url";
      rel?: string;
      title?: string;
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      email?: string;
      linktype: "email";
      [k: string]: any;
    }
  | {
      fieldtype: "multilink";
      id: string;
      url: string;
      cached_url: string;
      target?: "_blank" | "_self";
      linktype: "asset";
      [k: string]: any;
    };

export interface ResumeJobSb {
  position?: string;
  company_name?: string;
  company_url?: Exclude<
    ResumeMultilinkSb,
    { linktype?: "email" } | { linktype?: "asset" }
  >;
  details?: ResumeRichtextSb;
  summary?: ResumeRichtextSb;
  start_date?: string;
  end_date?: string;
  component: "job";
  _uid: string;
  [k: string]: any;
}

export interface ResumeLinkSb {
  label?: string;
  text?: string;
  reference?: Exclude<
    ResumeMultilinkSb,
    { linktype?: "email" } | { linktype?: "asset" }
  >;
  component: "link";
  _uid: string;
  [k: string]: any;
}

export interface ResumePageSb {
  body?: (
    | ResumeIndexSb
    | ResumeJobSb
    | ResumeLinkSb
    | ResumePageSb
    | ResumePostSb
    | ResumePostContentSb
  )[];
  component: "page";
  _uid: string;
  [k: string]: any;
}

export interface ResumePostSb {
  description?: ResumeRichtextSb;
  body?: ResumePostContentSb[];
  component: "post";
  _uid: string;
  [k: string]: any;
}

export interface ResumePostContentSb {
  title?: string;
  content?: ResumeRichtextSb;
  component: "post_content";
  _uid: string;
  [k: string]: any;
}
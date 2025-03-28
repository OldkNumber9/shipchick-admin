"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreVertical, Link2, ImageIcon, Code, Plus, ChevronDown } from "lucide-react"
import ClientSideCustomEditor from '@/components/client-side-custom-editor';

// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import { ClassicEditor, Essentials, Paragraph, Bold, Italic } from 'ckeditor5';
// import dynamic from "next/dynamic"

// Dynamically import CKEditor to avoid SSR issues
// const CKEditor = dynamic(() => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor), {
//   ssr: false,
//   loading: () => <p>Loading editor...</p>,
// })

// // Dynamically import the ClassicEditor build
// const ClassicEditor = dynamic(() => import("@ckeditor/ckeditor5-build-classic"), {
//   ssr: false,
// })

export default function TermsConditions() {
  const [title, setTitle] = useState("Lorem ipsum dolor")
  const [content, setContent] =
    useState(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eligendi nemo nam neque maiores enim que rerum dolores quasi, ipsum provident obcaecati. Voluptates excepturi alias debitis quas vero labore ea officiis!</p>
<p>Lorem ipsum dolor sit amet.</p>
<p>Eligendi nemo nam neque maiores enim que rerum dolores quasi, ipsum provident obcaecati. Voluptates excepturi alias debitis quas vero labore ea officiis!</p>`)
  const [activeTab, setActiveTab] = useState("editor")
  const [isEditorReady, setIsEditorReady] = useState(false)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  // Mock function for saving the content
  const handleSave = () => {
    console.log("Saving content:", { title, content })
    // Here you would typically send the data to your backend
  }

  return (
    <Layout title="TERMS & CONDITIONS">
      <div className="bg-white rounded-md shadow">
        {/* Editor Container */}
        <div className="border rounded-md">
          {/* Title Input */}
          <div className="flex items-center justify-between border-b p-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 text-lg font-medium focus-visible:ring-0 focus-visible:ring-offset-0 w-auto"
              placeholder="Title"
            />
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-gray-700">
                <MoreVertical size={18} />
              </button>
              <div className="flex items-center border rounded-md">
                <div className="px-3 py-1 flex items-center gap-1 text-sm">
                  <span>Current version</span>
                  <ChevronDown size={14} />
                </div>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Close</span>
                &times;
              </button>
            </div>
          </div>

          {/* Editor/Preview Tabs */}
          <Tabs defaultValue="editor" value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b px-3">
              <TabsList className="bg-transparent p-0 h-auto">
                <TabsTrigger
                  value="editor"
                  className="px-3 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none"
                >
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                    Editor
                  </span>
                </TabsTrigger>
                <TabsTrigger
                  value="preview"
                  className="px-3 py-2 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-blue-500 data-[state=active]:shadow-none"
                >
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview
                  </span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Toolbar */}
            {/* <div className="border-b flex items-center p-1">
              <div className="flex items-center gap-1 px-2">
                <div className="relative">
                  <select className="appearance-none border rounded px-2 py-1 pr-6 text-sm">
                    <option>Normal</option>
                    <option>Heading 1</option>
                    <option>Heading 2</option>
                    <option>Heading 3</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
                  />
                </div>
              </div>

              <div className="flex items-center border-l pl-2">
                <button className="p-1 rounded hover:bg-gray-100">
                  <span className="font-bold">B</span>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <span className="italic">I</span>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <span className="underline">U</span>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <Link2 size={16} />
                </button>
              </div>

              <div className="flex items-center border-l pl-2">
                <button className="p-1 rounded hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3" y1="6" y2="6" />
                    <line x1="3" x2="3" y1="12" y2="12" />
                    <line x1="3" x2="3" y1="18" y2="18" />
                  </svg>
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="8" x2="21" y1="6" y2="6" />
                    <line x1="8" x2="21" y1="12" y2="12" />
                    <line x1="8" x2="21" y1="18" y2="18" />
                    <line x1="3" x2="3.01" y1="6" y2="6" />
                    <line x1="3" x2="3.01" y1="12" y2="12" />
                    <line x1="3" x2="3.01" y1="18" y2="18" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center border-l pl-2">
                <button className="p-1 rounded hover:bg-gray-100">
                  <ImageIcon size={16} />
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <Code size={16} />
                </button>
              </div>

              <div className="flex items-center ml-auto">
                <button className="p-1 rounded hover:bg-gray-100">
                  <Plus size={16} />
                </button>
                <button className="p-1 rounded hover:bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 3h6v6" />
                    <path d="M10 14 21 3" />
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </button>
              </div>
            </div> */}

            <TabsContent value="editor" className="p-0 m-0">
              {/* CKEditor Component */}
              <div className="min-h-[400px]">  
              {isMounted && (
                    <div className="ckeditor-container">
                        <ClientSideCustomEditor
                        value={content}
                        onChange={setContent}
                        />
                    </div>
                    )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="p-6 m-0 min-h-[400px]">
              <div className="prose max-w-none">
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div dangerouslySetInnerHTML={{ __html: content }} />
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="border-t p-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                <span>6d</span>
              </div>
              <div className="flex items-center gap-1 text-gray-500 text-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
                <span>6d</span>
              </div>
              <div className="px-2 py-1 bg-gray-100 rounded text-xs uppercase">CUSTOM BADGE</div>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m3 16 4 4 14-14" />
                </svg>
                Publish
              </Button>
              <button className="border rounded p-1">
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
 
    </Layout>
  )
}


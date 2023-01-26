'use client'
import React, { useState } from 'react'

const CardForm = () => {
  const [activeTab, setActiveTab] = useState('text')
  const [textInput, setTextInput] = useState('')
  const [fileInput, setFileInput] = useState<File | undefined>(undefined)
  const [messageInput, setMessageInput] = useState('')
  const [options, setOptions] = useState<string[]>([])

  const handleTextInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value)
  }

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileInput(event.target.files?.[0])
  }

  const handleMessageInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessageInput(event.target.value)
  }

  const handleOptionsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = event.target.value
    if (event.target.checked) {
      setOptions([...options, option])
    } else {
      setOptions(options.filter((o) => o !== option))
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    console.log('Text Input:', textInput)
    console.log('File Input:', fileInput)
    console.log('Message Input:', messageInput)
    console.log('Options:', options)
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col space-y-10">
      <span className="mt-10 text-2xl font-bold">Lens Gated Share </span>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="flex cursor-pointer items-center justify-between">
          <ul className="flex border-b border-gray-100 text-sm font-medium">
            <li
              className={`-mb-px  p-4  ${
                activeTab === 'text'
                  ? 'border-b border-current text-cyan-500'
                  : 'border-b border-transparent'
              }`}
              onClick={() => setActiveTab('text')}
            >
              Text
            </li>
            <li
              className={`-mb-px  p-4 hover:text-cyan-500 ${
                activeTab === 'file'
                  ? 'border-b border-current text-cyan-500'
                  : 'border-b border-transparent'
              }`}
              onClick={() => setActiveTab('file')}
            >
              File
            </li>
          </ul>
        </div>
        <div className="mt-6">
          {activeTab === 'text' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block font-medium text-gray-700" htmlFor="textInput">
                  Text Input
                </label>
                <input
                  className="focus:shadow-outline w-full rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                  type="text"
                  id="textInput"
                  value={textInput}
                  onChange={handleTextInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-medium text-gray-700" htmlFor="options">
                  Options
                </label>
                <div className="flex flex-wrap">
                  <div className="relative">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      id="follow"
                      value="follow"
                      checked={options.includes('follow')}
                      onChange={handleOptionsChange}
                    />
                    <label htmlFor="follow" className="text-sm">
                      Follow
                    </label>
                  </div>
                  <div className="relative ml-4">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      id="collect"
                      value="collect"
                      checked={options.includes('collect')}
                      onChange={handleOptionsChange}
                    />
                    <label htmlFor="collect" className="text-sm">
                      Collect
                    </label>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
                  Create Secret Link
                </button>
              </div>
            </form>
          )}
          {activeTab === 'file' && (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-2 block font-medium text-gray-700">File Input</label>
                <input
                  className="focus:shadow-outline w-full rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                  type="file"
                  id="fileInput"
                  onChange={handleFileInputChange}
                />
              </div>
              <div className="mb-4">
                <label className="mb-2 block font-medium text-gray-700" htmlFor="messageInput">
                  Message
                </label>
                <textarea
                  className="focus:shadow-outline w-full rounded border py-2 px-3 leading-tight text-gray-700 focus:outline-none"
                  id="messageInput"
                  value={messageInput}
                  onChange={handleMessageInputChange}
                />
              </div>
              <div className="text-center">
                <button className="rounded-lg bg-blue-500 py-2 px-4 text-white hover:bg-blue-600">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
export default CardForm

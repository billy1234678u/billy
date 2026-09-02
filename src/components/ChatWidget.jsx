import { useRef, useState } from 'react'
import { Send, Sparkles, X } from 'lucide-react'

const API_ENDPOINT = '/.netlify/functions/chat'

const initialMessages = [
  {
    role: 'assistant',
    content:
      "Hi, I'm SageMind! Ask me about Billy's skills, services, projects, experience, or how to get in touch.",
  },
]

function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const listRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight
      }
    }, 50)
  }

  const handleSend = async (e) => {
    e.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMessage = { role: 'user', content: text }
    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    setInput('')
    setLoading(true)
    setError('')
    scrollToBottom()

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
    } catch {
      setError('SageMind could not respond right now. The AI may not be configured or deployed yet.')
    } finally {
      setLoading(false)
      scrollToBottom()
    }
  }

  return (
    <>
      <button
        type="button"
        className="chat-launcher"
        aria-label={open ? 'Close SageMind chat' : 'Open SageMind chat'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? <X size={22} /> : <Sparkles size={22} />}
      </button>

      {open && (
        <section className="chat-widget" aria-label="Chat with SageMind, Billy’s AI assistant">
          <header className="chat-header">
            <span className="chat-avatar" aria-hidden="true">
              <Sparkles size={20} />
            </span>
            <div>
              <strong>SageMind</strong>
              <span className="chat-status">AI · online</span>
            </div>
          </header>

          <div className="chat-messages" ref={listRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-bubble ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chat-bubble assistant">
                <span className="typing-dots">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>

          {error && <p className="chat-error">{error}</p>}

          <form className="chat-form" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask SageMind about Billy’s work..."
              aria-label="Type your message"
              disabled={loading}
            />
            <button type="submit" className="chat-send" aria-label="Send message" disabled={loading || !input.trim()}>
              <Send size={18} />
            </button>
          </form>
        </section>
      )}
    </>
  )
}

export default ChatWidget

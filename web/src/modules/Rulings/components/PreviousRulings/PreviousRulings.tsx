import type { IPreviousRulingsProps } from "./types"

export const PreviousRulings = (props: IPreviousRulingsProps) => {
  return (
    <div className="rt-previous-rulings">
      hello { JSON.stringify(props.celebrities) }
    </div>
  )
}
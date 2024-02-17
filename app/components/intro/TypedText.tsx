const TypedText = () => {
	return (
		<div className="h-2/8 flex w-fit flex-row leading-[1px]">
			<div className="mr-2 mt-1 text-right text-sm leading-[10.7px] text-gray-400">
				<h5>1</h5>
				<br></br>
				<h5>2</h5>
				<br></br>
				<h5>3</h5>
				<br></br>
				<h5>4</h5>
				<br></br>
				<h5>5</h5>
			</div>
			<div className="text-left text-sm leading-[10.7px]">
				<h5>{`
const data = {`}</h5>
				<br></br>
				<h5 className="pl-[35px]">{`
occupations: [‘Software Developer’, 'Musician'],`}</h5>
				<br></br>
				<h5 className="pl-[35px]">{`
specializations: [‘frontend web dev', ‘audio apps’],`}</h5>
				<br></br>
				<h5 className="pl-[35px]">{`
location: ‘Rotterdam, Netherlands’
`}</h5>
				<br></br>
				<h5>{`
};`}</h5>
			</div>
		</div>
	);
};

export default TypedText;
